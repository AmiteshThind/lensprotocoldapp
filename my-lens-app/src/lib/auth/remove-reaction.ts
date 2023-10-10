import { useMutation } from "@tanstack/react-query";
import useLogin from "./useLogin";
import useLensUser from "./useLensUser";
import { ReactionTypes, LensClient, production } from "@lens-protocol/client";
import {
  useAddReactionMutation,
  useCreateFollowTypedDataMutation,
  useRemoveReactionMutation,
  useWhoReactedPublicationQuery,
} from "@/src/graphql/generated";

export function useRemoveReaction() {
  console.log("called useaddreaction");
  const { mutateAsync: loginUser } = useLogin();
  const { profileQuery } = useLensUser();
  //   const lensClient = new LensClient({
  //     environment: production,
  //   });
  const { mutateAsync: removeReactionMutation } = useRemoveReactionMutation();

  async function removeReaction(publicationId: string) {
    const result = await removeReactionMutation({
      request: {
        profileId: profileQuery.data?.defaultProfile?.id,
        publicationId: publicationId,
        reaction: ReactionTypes.Upvote,
      },
    });
  }

  return useMutation(removeReaction);
}
