//0. make sure user has connected wallet
//1. generate challenge which comes from the lens api
//2. sing the challenge with the users wallet
//3. send the signed challnge to lens api
//4. receive a access token from lens api if we succeed
//5. store the accoes token inside local storage so we can use it.

import { useAddress, useSDK } from "@thirdweb-dev/react";
import generateChallange from "./generateChallenge";
import { useAuthenticateMutation } from "@/src/graphql/generated";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAccessToken } from "./helpers";

export default function useLogin() {
  const address = useAddress();
  const sdk = useSDK();
  const { mutateAsync: sendSignedMessage } = useAuthenticateMutation();
  const client = useQueryClient();
  async function login() {
    if (!address) return; // must be connected
    //1. generate challenge which comes from the lens api
    const { challenge } = await generateChallange(address);

    //2. sing the challenge with the users wallet

    const signature = await sdk?.wallet.sign(challenge.text);
    //3. send the signed challnge to lens api

    const { authenticate } = await sendSignedMessage({
      request: {
        address,
        signature,
      },
    });
    //4. receive a access token from lens api if we succeed
    // console.log("Authetnicated", authenticate);
    const { accessToken, refreshToken } = authenticate;
    setAccessToken(accessToken, refreshToken);
    //5. store the accoes token inside local storage so we can use it.

    client.invalidateQueries(["lens-user", address]);
  }

  //return the usemeutation hook wrappign the async function

  return useMutation(login);
}
