import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import useLogin from "../lib/auth/useLogin";
import SignInButton from "../Components/SignInButton";
import FeedPost from "../Components/FeedPost";

import {
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from "../graphql/generated";
import Navbar from "../Components/Navbar";

type HomeProps = {
  children: React.ReactNode;
};

export default function Home(props: HomeProps) {
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
      <div className=" flex   mt-20  items-center flex-col  w-full   ">
        <div className=" w-5/6 sm:w-5/6   md:w-4/6 lg:w-1/3 xl:w-1/3 ">
          {data?.explorePublications.items.map((publication) => (
            <FeedPost publication={publication} key={publication.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
