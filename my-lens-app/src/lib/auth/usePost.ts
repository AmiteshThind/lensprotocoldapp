import { WizzPost } from "@/src/common/types";
import {
  CreatePostTypedDataDocument,
  CreatePublicPostRequest,
  PublicationMainFocus,
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

export function useCreatePost() {
  const { mutateAsync: requestTypedData } = useCreatePostTypedDataMutation();
  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  const { profileQuery } = useLensUser();
  const sdk = useSDK();
  const queryClient = useQueryClient();

  async function createPost(newWizz: WizzPost) {
    //0. upload image to ipfs
    let imageIpfsUrl;
    if (newWizz.media != null) {
      imageIpfsUrl = (await uploadToIpfs({ data: [newWizz.media] }))[0] || "";
    }
    // upload actual content to ipfs

    const postMetaData = {
      version: "2.0.0",
      mainContentFocus: PublicationMainFocus.TextOnly,
      metadata_id: uuidv4(),
      description: newWizz.description,
      locale: "en-US",
      content: "Content",
      external_url: null,
      image: imageIpfsUrl,
      imageMimeType: null,
      name: "WizzPost",
      attributes: [],
      tags: [newWizz.category],
      appId: "wizz_dao",
    };

    const postMetaDataIpfsUrl = (
      await uploadToIpfs({ data: [postMetaData] })
    )[0];

    // console.log(imageIpfsUrl);
    // console.log(postMetaDataIpfsUrl);

    // 1. get typed data from lens
    const typedData = await requestTypedData({
      request: {
        profileId: profileQuery.data?.defaultProfile?.id,
        //ipfs hash -- todo upload to ipfs before this
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

    const { domain, types, value } = typedData.createPostTypedData.typedData;
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

    const result = await lensHubContract.call("postWithSig", [
      {
        profileId: value.profileId,
        contentURI: value.contentURI,
        collectModule: value.collectModule,
        collectModuleInitData: value.collectModuleInitData,
        referenceModule: value.referenceModule,
        referenceModuleInitData: value.referenceModuleInitData,
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

  return useMutation(createPost);
}

// -> ipfs upload metadata
