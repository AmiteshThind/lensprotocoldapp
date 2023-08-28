import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import useLogin from "../lib/auth/useLogin";
import SignInButton from "../Components/SignInButton";
import FeedPost from "../Components/FeedPost";

import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "../graphql/generated";
import Navbar from "../Components/Navbar";

export default function Home() {
  const { isLoading, error, data } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.TopCollected,
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  console.log(data);
  if (isLoading) {
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center h-full w-full">
        <div className="flex w-full my-5 h-12">
          <Navbar />
        </div>
        <div className="flex   mt-5  flex-col xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-full w-full h-full ">
          {data?.explorePublications.items.map((publication) => (
            <FeedPost publication={publication} key={publication.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
