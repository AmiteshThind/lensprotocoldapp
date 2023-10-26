import React from "react";
import { PublicationsQuery } from "../graphql/generated";
import Comment from "./Comment";
import CreateWizzInput from "./CreateWizzInput";
import CommentInput from "./CommentInput";

type Props = {
  comments: PublicationsQuery["publications"]["items"];
  publicationId: string;
};

const CommentsList = ({ comments, publicationId }: Props) => {
  return (
    <div className="   transition delay-150 border-l border-r border-b rounded-b-xl border  py-3 mb-5  border-neutral-700     w-full     ">
      <div className="">
        <CommentInput publicationId={publicationId} />
        {comments.map((comment) => (
          <div className="mx-10">
            <Comment comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
