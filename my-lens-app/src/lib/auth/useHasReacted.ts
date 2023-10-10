import { useWhoReactedPublicationQuery } from "@/src/graphql/generated";
import useLogin from "./useLogin";
import { useMutation, useQuery } from "@tanstack/react-query";
import useLensUser from "./useLensUser";

export function useHasReacted(publicationId: string) {
  let reaction;
  const { profileQuery } = useLensUser();
  const { data } = useWhoReactedPublicationQuery(
    {
      request: {
        publicationId: publicationId,
      },
    },
    {
      enabled: !!profileQuery.data?.defaultProfile?.id,
    }
  );
  reaction = data?.whoReactedPublication?.items[0]?.reaction;

  return {
    hasReacted: reaction,
  };
}
