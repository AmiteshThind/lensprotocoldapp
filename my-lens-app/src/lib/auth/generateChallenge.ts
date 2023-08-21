import { fetcher } from "@/auth-fetcher";
import {
  ChallengeQuery,
  ChallengeQueryVariables,
  ChallengeDocument,
} from "@/src/graphql/generated";

export default async function generateChallange(address: string) {
  return await fetcher<ChallengeQuery, ChallengeQueryVariables>(
    ChallengeDocument,
    {
      request: { address },
    }
  )();
}
