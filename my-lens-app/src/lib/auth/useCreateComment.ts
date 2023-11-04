import { WizzComment, WizzPost } from "@/src/common/types";
import {
  CreatePostTypedDataDocument,
  CreatePublicPostRequest,
  PublicationMainFocus,
  useCreateCommentTypedDataMutation,
  useCreatePostTypedDataMutation,
} from "@/src/graphql/generated";
import { useApolloClient } from "@lens-protocol/react-web";
import useLensUser from "./useLensUser";
import { signTypedDataWithOmittedTypename, splitSignature } from "../helpers";
import { useSDK, useStorageUpload } from "@thirdweb-dev/react";
import { v4 as uuidv4 } from "uuid";
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "@/src/const/contracts";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useLogin from "./useLogin";

export function useCreateComment() {
  const { mutateAsync: loginUser } = useLogin();
  const { mutateAsync: requestTypedData } = useCreateCommentTypedDataMutation();
  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  const { profileQuery } = useLensUser();
  const sdk = useSDK();
  const queryClient = useQueryClient();

  async function createComment(comment: WizzComment) {
    //0. upload image to ipfs (add post MVP)
    // let imageIpfsUrl;
    // if (comment.text != null) {
    //   imageIpfsUrl = (await uploadToIpfs({ data: [] }))[0] || "";
    // }
    // upload actual content to ipfs

    const postMetaData = {
      version: "2.0.0",
      mainContentFocus: PublicationMainFocus.TextOnly,
      metadata_id: uuidv4(),
      description: comment.text,
      locale: "en-US",
      content: "Content",
      external_url: null,
      image: null,
      imageMimeType: null,
      name: "WizzComment",
      attributes: [],
      tags: ["WizzComment"],
      appId: "wizz_dao",
    };

    const postMetaDataIpfsUrl = (
      await uploadToIpfs({ data: [postMetaData] })
    )[0];

    console.log(postMetaDataIpfsUrl);
    console.log("text" + comment.text);
    console.log(comment.publicationId);

    // 1. get typed data from lens
    const typedData = await requestTypedData({
      request: {
        publicationId: comment.publicationId,
        profileId: profileQuery.data?.defaultProfile?.id,
        contentURI: postMetaDataIpfsUrl,
        collectModule: {
          freeCollectModule: {
            followerOnly: false,
          },
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
      },
    });

    const { domain, types, value } = typedData.createCommentTypedData.typedData;
    //2. sign typed data
    if (!sdk) return;
    const signature = await signTypedDataWithOmittedTypename(
      sdk,
      domain,
      types,
      value
    );

    const { v, r, s } = splitSignature(signature.signature);

    //3. use signed typed data to send transaction to smart contract
    const lensHubContract = await sdk.getContractFromAbi(
      LENS_CONTRACT_ADDRESS,
      LENS_CONTRACT_ABI
    );

    const result = await lensHubContract.call("commentWithSig", [
      {
        profileId: value.profileId,
        contentURI: value.contentURI,
        profileIdPointed: value.profileIdPointed,
        pubIdPointed: value.pubIdPointed,
        collectModule: value.collectModule,
        collectModuleInitData: value.collectModuleInitData,
        referenceModule: value.referenceModule,
        referenceModuleInitData: value.referenceModuleInitData,
        referenceModuleData: value.referenceModuleData,
        sig: {
          v,
          r,
          s,
          deadline: value.deadline,
        },
      },
    ]);

    if (result) {
      queryClient.invalidateQueries();
    }
  }

  return useMutation(createComment);
}

// -> ipfs upload metadata
