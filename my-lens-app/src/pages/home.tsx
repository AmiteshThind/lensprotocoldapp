import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import useLogin from "../lib/auth/useLogin";
import SignInButton from "../Components/SignInButton";
import FeedPost from "../Components/FeedPost";

import {
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublicationsQuery,
} from "../graphql/generated";
import Navbar from "../Components/Navbar";
import CreateWizzInput from "../Components/CreateWizzInput";

type HomeProps = {
  children: React.ReactNode;
};

export default function Home(props: HomeProps) {
  const { isLoading, error, data } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.Latest,
        sources: ["wizz_dao"],
        publicationTypes: [PublicationTypes.Post],
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
  // console.log("wow" + data?.explorePublications.items[0]);

  if (isLoading) {
    // console.log("isLOADING");
    return (
      <div className="h-screen flex w-screen justify-center items-center">
        <span className="  loading loading-spinner loading-lg text-emerald-500 "></span>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="flex flex-col items-center ">
        <div className="w-full flex justify-center  ">
          <CreateWizzInput />
        </div>
        <div className=" flex  items-center flex-col  w-full   ">
          <div className="  w-5/6 sm:w-5/6   md:w-5/6 lg:w-2/3 xl:w-1/3 ">
            {data?.explorePublications.items
              .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
              .map((publication) => (
                <div className="mb-5">
                  <FeedPost publication={publication} key={publication.id} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
