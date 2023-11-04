import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helpers";
import { useDefaultProfileQuery } from "@/src/graphql/generated";

export default function useLensUser() {
  //1. make a react query for local storage key
  const address = useAddress();
  // console.log(address);
  const localStorageQuery = useQuery(["lens-user", address], () => {
    const token = readAccessToken();
    return token;
  });

  // if there is a connected wallet then ask for default profile from lens

  const profileQuery = useDefaultProfileQuery(
    {
      request: {
        ethereumAddress: address,
      },
    },
    {
      enabled: !!address, //means not undfined and user is connected as address is avaiable
    }
  );

  console.log(profileQuery.data);

  return {
    //contains information about borth the local storage and the info about the lens profile
    isSignedInQuery: localStorageQuery,
    profileQuery: profileQuery,
  };
}
