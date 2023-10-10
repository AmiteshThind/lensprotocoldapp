import React from "react";
import { FaRegCommentDots } from "react-icons/fa";

import { ExplorePublicationsQuery } from "../graphql/generated";
interface Props {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
}
const CommentPost = ({ publication }: Props) => {
  return (
    <div>
      <FaRegCommentDots className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
    </div>
  );
};

export default CommentPost;
