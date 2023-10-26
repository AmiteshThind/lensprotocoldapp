import React from "react";
import { FaRegCommentDots } from "react-icons/fa";

import { ExplorePublicationsQuery } from "../graphql/generated";
import CommentModal from "./CommentModal";
interface Props {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
  showCommentModal: boolean;
}
const CommentPost = ({ publication, showCommentModal }: Props) => {
  return (
    <div>
      <FaRegCommentDots
        onClick={() =>
          document.getElementById("my_modal_4" + publication.id).showModal()
        }
        className="h-5 w-5 hover:text-blue-400 cursor-pointer"
      />

      <CommentModal publication={publication} />
    </div>
  );
};

export default CommentPost;
