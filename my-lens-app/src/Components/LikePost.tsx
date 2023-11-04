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
import { useRemoveReaction } from "../lib/auth/remove-reaction";

interface Props {
  post: ExplorePublicationsQuery["explorePublications"]["items"][0];
}
const LikePost = ({ post }: Props) => {
  //   const { mutateAsync: loginUser } = useLogin();
  const { mutateAsync: addLikeReaction } = useAddReaction();
  const { mutateAsync: removeLikeReaction } = useRemoveReaction();
  const { hasReacted, isLoading, isSuccess } = useHasReacted(post.id);
  // console.log("WHAT" + hasReacted);
  const [upvoted, setUpvoted] = useState<ReactionTypes | undefined>(undefined);

  useEffect(() => {
    setUpvoted(hasReacted);
    // console.log("WHAT" + hasReacted);
  }, [isSuccess]);

  return (
    <div>
      {!upvoted ? (
        <AiOutlineHeart
          onClick={async () => {
            setUpvoted(ReactionTypes.Upvote);
            await addLikeReaction(post.id);

            //queryClient.invalidateQueries();
          }}
          className="h-5 w-5 text-neutral-300  hover:text-red-500 hover:scale-125 hover:duration-200 cursor-pointer"
        />
      ) : (
        <AiFillHeart
          onClick={async () => {
            setUpvoted(undefined);
            await removeLikeReaction(post.id);
          }}
          className="h-5 w-5  text-red-500 hover:scale-125 hover:duration-200 cursor-pointer"
        />
      )}
    </div>
  );
};

export default LikePost;
