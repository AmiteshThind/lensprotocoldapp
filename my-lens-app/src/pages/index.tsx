import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import useLogin from "../lib/auth/useLogin";
import SignInButton from "../Components/SignInButton";
import FeedPost from "../Components/FeedPost";

import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "../graphql/generated";
import Navbar from "../Components/Navbar";
import Menu from "../Components/Menu";

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
      <div className=" w-full items-center fixed flex justify-center top-0 z-10 ">
        <Navbar />
      </div>
      <div className="flex ml-5 ">
        <div>
          <div className="   flex items-center mt-20   flex-col   w-full   ">
            <div className=" w-full  md:w-1/2 lg:w-1/3 xl:w-1/3 ">
              {data?.explorePublications.items.map((publication) => (
                <FeedPost publication={publication} key={publication.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
