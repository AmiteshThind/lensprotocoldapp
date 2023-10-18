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
      <dialog id={"my_modal_4" + publication.id} className="modal">
        <div className="modal-box p-8">
          <form method="dialog">
            <button className="btn btn-xs mx-1 my-1 btn-circle btn-ghost absolute right-1 top-1">
              ✕
            </button>
          </form>
          <CommentModal publication={publication} />
        </div>
      </dialog>
    </div>
  );
};

export default CommentPost;
