import {
  ChainId,
  ConnectWallet,
  useAddress,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";
import React from "react";
import useLensUser from "../lib/auth/useLensUser";
import useLogin from "../lib/auth/useLogin";

type Props = {};

export default function SignInButton({}: Props) {
  const address = useAddress(); //detect connected address
  const isOnWrongNetwork = useNetworkMismatch(); //detect user is on wrong network
  const switchChain = useSwitchChain(); //function to switch users network
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();
  //user needs to connect wallet
  if (!address) {
    <ConnectWallet />;
  }
  // user needs to be on right network
  if (isOnWrongNetwork) {
    <button onClick={() => switchChain(ChainId.Mumbai)}>Switch Network</button>;
  }

  //loading signed in state
  if (isSignedInQuery.isLoading) {
    return <div>Loading...</div>;
  }

  //if user is not signed in we need to requst a login

  if (!isSignedInQuery.data) {
    return (
      <button
        onClick={() => {
          requestLogin();
        }}
      >
        Sign In With Lens
      </button>
    );
  }

  //loading their profile info

  if (profileQuery.isLoading) {
    <div>Is Loading ...</div>;
  }

  if (!profileQuery.data?.defaultProfile) {
    console.log(profileQuery.data);
    return <div>No Lens Profile</div>;
  }

  if (profileQuery.data?.defaultProfile) {
    console.log(profileQuery.data);
    return <div>Hello {profileQuery.data?.defaultProfile.handle}</div>;
  }

  return <div>Something went wrong</div>;
}
