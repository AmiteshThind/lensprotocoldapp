import {
  RefreshMutation,
  RefreshMutationVariables,
  RefreshDocument,
} from "@/src/graphql/generated";
import { readAccessToken, setAccessToken } from "./helpers";

export default async function refreshAccessToken(): Promise<string | null> {
  //1. get current refresh token from local storage
  const currentRefreshToken = readAccessToken()?.refreshToken;
  //2. send to lens to ask for a new access token
  if (!currentRefreshToken) return null;

  async function fetchData<TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"]
  ): Promise<TData> {
    const res = await fetch("https://api.lens.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options,

        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Error…");
    }

    return json.data;
  }

  const result = await fetchData<RefreshMutation, RefreshMutationVariables>(
    RefreshDocument,
    {
      request: {
        refreshToken: currentRefreshToken,
      },
    }
  );
  //3. set the new access token in local storage
  setAccessToken(result.refresh.accessToken, result.refresh.refreshToken);
  return result.refresh.accessToken;
}
