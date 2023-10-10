import { useCreateFollowTypedDataMutation } from "@/src/graphql/generated";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { signTypedDataWithOmittedTypename } from "../helpers";
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "@/src/const/contracts";
import { splitSignature } from "ethers/lib/utils";
import { useMutation } from "@tanstack/react-query";
import useLogin from "./useLogin";

export function useFollow() {
  const { mutateAsync: requestTypedData } = useCreateFollowTypedDataMutation();
  const sdk = useSDK();
  const address = useAddress();
  const { mutateAsync: loginUser } = useLogin();
  console.log("called useFollow");
  //1. use auto generated mutation called "useCreateFollowTypedData" to get the typed data for the user to sign
  async function follow(userId: string) {
    await loginUser();
    const typedData = await requestTypedData({
      request: {
        follow: [
          {
            profile: userId,
          },
        ],
      },
    });

    //2. ask user to sign typed data
    const { domain, types, value } = typedData.createFollowTypedData.typedData;
    if (sdk === undefined) return;
    const signature = await signTypedDataWithOmittedTypename(
      sdk,
      domain,
      types,
      value
    );

    const { v, r, s } = splitSignature(signature.signature);

    const lensHubContract = await sdk.getContractFromAbi(
      LENS_CONTRACT_ADDRESS,
      LENS_CONTRACT_ABI
    );

    //call the smart contract function called "followWithSig"

    const result = await lensHubContract.call("followWithSig", [
      {
        follower: address,
        profileIds: [userId],
        datas: value.datas,
        sig: {
          v,
          r,
          s,
          deadline: value.deadline,
        },
      },
    ]);

    console.log(result);
  }

  //3. send typed data to smart conttract to eprform the writer operation on blockchain
  return useMutation(follow);
}
