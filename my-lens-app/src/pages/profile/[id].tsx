// see selected users profile pic
// see user bio
// see user handle
// see user followers
// see user following
// see if user follows me
// see if i follow user
// opton to follow or unfollow user
// see list of Wizzies User has created and have option to comment  on them/ interact with them just like in the feed

import { useProfileQuery } from "@/src/graphql/generated";
import React from "react";
import { useRouter } from "next/router";
import { AiOutlineLeftCircle } from "react-icons/ai";
import Link from "next/link";
type Props = {};

const ProfilePage = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading: loadingProfile, data: profileData } = useProfileQuery({
    //grab the path /[id] field from the url
    request: {
      handle: id,
    },
  });

  console.log(profileData);

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
      <div></div>
      <div></div>
    </div>
  );
};

export default ProfilePage;
