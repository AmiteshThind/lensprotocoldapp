import React from "react";
import { BsFillBagHeartFill, BsBagHeart } from "react-icons/bs";

import { ExplorePublicationsQuery } from "../graphql/generated";
interface Props {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
}
const CollectPost = ({ publication }: Props) => {
  return (
    <div>
      <BsBagHeart className="h-5 w-5 hover:text-pink-400 cursor-pointer" />
    </div>
  );
};

export default CollectPost;
