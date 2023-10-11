// see selected users profile pic
// see user bio
// see user handle
// see user followers
// see user following
// see if user follows me
// see if i follow user
// opton to follow or unfollow user
// see list of Wizzies User has created and have option to comment  on them/ interact with them just like in the feed

import { useProfileQuery, usePublicationsQuery } from "@/src/graphql/generated";
import React from "react";
import { useRouter } from "next/router";
import { AiOutlineLeftCircle } from "react-icons/ai";
import Link from "next/link";
import { MediaRenderer, Web3Button } from "@thirdweb-dev/react";
import FeedPost from "@/src/Components/FeedPost";
import {
  FOLLOW_NFT_CONTRACT_ABI,
  FOLLOW_NFT_CONTRACT_ADDRESS,
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "@/src/const/contracts";
import { useFollow } from "@/src/lib/auth/useFollow";
import { useUnfollow } from "@/src/lib/auth/useUnfollow";
type Props = {};

const ProfilePage = (props: Props) => {
  const { mutateAsync: followUser } = useFollow();
  const { mutateAsync: unfollowUser } = useUnfollow();
  const router = useRouter();
  const { id } = router.query;
  const { isLoading: loadingProfile, data: profileData } = useProfileQuery({
    //grab the path /[id] field from the url
    request: {
      handle: id,
    },
  });

  const { isLoading: isLoadingPublications, data: publicationsData } =
    usePublicationsQuery(
      {
        request: {
          profileId: profileData?.profile?.id,
          sources: ["wizz_dao"],
        },
      },
      {
        enabled: !!profileData?.profile?.id,
      }
    );

  console.log(profileData);
  console.log("data" + publicationsData);

  //row 1 - back button
  // row 2 profile pic, bio, follow button , stats
  // row 3 - list of wizzes in feed post format (sorted by date or something (add additional sort functionality later (post MVP)))

  return (
    <div className="flex flex-col mt-20 p-10 ">
      <div className="w-full rounded-full">
        <Link href={"/"}>
          <AiOutlineLeftCircle className="text-emerald-300 h-8 w-8" />
        </Link>
      </div>
      <div className="border border-neutral-700 mt-5 flex flex-col justify-center md:flex-row items-center p-5 rounded-xl">
        <div className="flex items-center justify-center flex-col sm:flex-row  w-full md:w-2/6 ">
          <div className="avatar h-full">
            <div className="w-36 h-36 mx-3 rounded-full">
              <MediaRenderer
                width="100%"
                height="100%"
                src={
                  // @ts-ignore - the type does exist
                  profileData?.profile?.picture?.original?.url ||
                  "https://soccerpointeclaire.com/wp-content/uploads/2021/06/default-profile-pic-e1513291410505.jpg"
                }
              />
            </div>
          </div>

          <div className="flex flex-col  justify-center items-center mx-5    ">
            <div className="flex flex-col text-center sm:text-start   w-full ">
              <div className="text-3xl mt-2 font-semibold">
                {profileData?.profile?.name}
              </div>
              <div className="text-lg mt-2 text-neutral-300">
                {profileData?.profile?.stats.totalFollowers} Followers
              </div>
              <div className="text-lg text-neutral-300">
                {profileData?.profile?.stats.totalFollowing} Following
              </div>
              <div className="mt-5 justify-center">
                {!profileData?.profile?.isFollowedByMe ? (
                  <Web3Button
                    contractAddress={LENS_CONTRACT_ADDRESS}
                    contractAbi={LENS_CONTRACT_ABI}
                    action={async () =>
                      await followUser(profileData?.profile?.id)
                    }
                    className="hover:scale-105 duration-150 px-10 py-2    bg-white text-black font-semibold rounded-2xl "
                  >
                    <span>Follow</span>
                  </Web3Button>
                ) : (
                  <Web3Button
                    contractAddress={FOLLOW_NFT_CONTRACT_ADDRESS}
                    contractAbi={FOLLOW_NFT_CONTRACT_ABI}
                    action={async () =>
                      await unfollowUser(profileData?.profile?.id)
                    }
                    className="hover:scale-105 duration-150 px-10 py-2    bg-white text-black font-semibold rounded-2xl "
                  >
                    <span>Unfollow</span>
                  </Web3Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-3/6 mt-10 md:mt-0  text-center   justify-center  md:justify-start items-center text-2xl">
          <div className="mx-5">
            <span className="text-emerald-300 mx-1">
              {publicationsData?.publications.items.length}
            </span>{" "}
            Wizzies
          </div>
          <div className="mx-5">
            <span className="text-emerald-300 mx-1">
              {profileData?.profile?.stats.totalCollects}
            </span>{" "}
            Collects
          </div>
          <div className="mx-5">
            <span className="text-emerald-300 mx-1">
              {profileData?.profile?.stats.totalComments}
            </span>{" "}
            Comments
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex flex-wrap">
        <div className=" flex justify-center flex-col items-center">
          {publicationsData?.publications.items.map((publication, key) => (
            <div className="w-full md:w-2/3 lg:w-1/3">
              <FeedPost publication={publication} key={key} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
