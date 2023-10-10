import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  ExplorePublicationsQuery,
  usePublicationsQuery,
  useWhoReactedPublicationQuery,
} from "../graphql/generated";
import useLensUser from "../lib/auth/useLensUser";
import {
  AnyPublication,
  Post,
  ReactionTypes,
  usePublication,
  useReaction,
} from "@lens-protocol/react-web";
import useLogin from "../lib/auth/useLogin";
import { useAddReaction } from "../lib/auth/useAddReaction";
import { useHasReacted } from "../lib/auth/useHasReacted";

interface Props {
  post: ExplorePublicationsQuery["explorePublications"]["items"][0];
}
const LikePost = ({ post }: Props) => {
  //   const { mutateAsync: loginUser } = useLogin();
  const { mutateAsync: addLikeReaction } = useAddReaction();
  const { hasReacted } = useHasReacted(post.id);
  console.log("WHAT" + hasReacted);
  return (
    <div>
      {hasReacted != ReactionTypes.Upvote ? (
        <AiOutlineHeart
          onClick={async () => {
            addLikeReaction(post.id);
          }}
          className="h-5 w-5 hover:text-red-500 cursor-pointer"
        />
      ) : (
        <AiFillHeart
          onClick={async () => {
            console.log("removeREaction");
          }}
          className="h-5 w-5 text-red-500 cursor-pointer"
        />
      )}
    </div>
  );
};

export default LikePost;
