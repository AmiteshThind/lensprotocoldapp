import { useCreateUnfollowTypedDataMutation } from "@/src/graphql/generated";
import useLogin from "./useLogin";
import { useSDK, useSigner } from "@thirdweb-dev/react";
import { signTypedDataWithOmittedTypename } from "../helpers";
import { splitSignature } from "ethers/lib/utils";
import {
  FOLLOW_NFT_CONTRACT_ABI,
  FOLLOW_NFT_CONTRACT_ADDRESS,
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "@/src/const/contracts";
import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";

export function useUnfollow() {
  const sdk = useSDK();
  const { mutateAsync: requestUnfollowTypedData } =
    useCreateUnfollowTypedDataMutation();
  const { mutateAsync: loginUser } = useLogin();

  async function unfollow(userId: string) {
    await loginUser();
    const typedData = await requestUnfollowTypedData({
      request: {
        profile: userId,
      },
    });

    const { domain, types, value } =
      typedData.createUnfollowTypedData.typedData;

    if (sdk === undefined) return;
    const signature = await signTypedDataWithOmittedTypename(
      sdk,
      domain,
      types,
      value
    );

    const { v, r, s } = splitSignature(signature.signature);

    //3. call to contract

    // const followNFTContract = new ethers.Contract(
    //   FOLLOW_NFT__CONTRACT_ADDRESS,
    //   FOLLOW_NFT_CONTRACT_ABI,
    //   signer
    // );

    console.log(FOLLOW_NFT_CONTRACT_ADDRESS);
    const lensHubContract = await sdk.getContractFromAbi(
      domain.verifyingContract,
      FOLLOW_NFT_CONTRACT_ABI
    );
    // console.log({ v, r, s, deadline: value.deadline });
    // console.log(value.tokenId);
    try {
      const response = await lensHubContract.call("burnWithSig", [
        value.tokenId,
        { v, r, s, deadline: value.deadline },
      ]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return useMutation(unfollow);
}
