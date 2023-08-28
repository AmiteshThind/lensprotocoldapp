import { useProfileQuery } from "@/src/graphql/generated";
import React from "react";
import { useRouter } from "next/router";
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

  return (
    <div>
      <div>
        {/*cover image*/}
        {/*Profile picture*/}
        {/*profile name*/}
        {/*profile handle*/}
        {/*profile description*/}
      </div>
    </div>
  );
};

export default ProfilePage;
