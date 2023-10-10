import { useMutation } from "@tanstack/react-query";
import useLogin from "./useLogin";
import useLensUser from "./useLensUser";
import { ReactionTypes, LensClient, production } from "@lens-protocol/client";
import {
  useAddReactionMutation,
  useCreateFollowTypedDataMutation,
  useWhoReactedPublicationQuery,
} from "@/src/graphql/generated";

export function useAddReaction() {
  console.log("called useaddreaction");
  const { mutateAsync: loginUser } = useLogin();
  const { profileQuery } = useLensUser();
  //   const lensClient = new LensClient({
  //     environment: production,
  //   });
  const { mutateAsync: addReactionMutation } = useAddReactionMutation();

  async function addReaction(publicationId: string) {
    await loginUser();

    const result = await addReactionMutation({
      request: {
        profileId: profileQuery.data?.defaultProfile?.id,
        publicationId: publicationId,
        reaction: ReactionTypes.Upvote,
      },
    });
  }

  return useMutation(addReaction);
}
