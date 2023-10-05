import { isTokenExpired, readAccessToken } from "../lib/auth/helpers";
import refreshAccessToken from "../lib/auth/refreshAccessToken";

// logic we want to run every time we send a request to the lens graphql server
export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"]
): (() => Promise<TData>) => {
  async function getAccessToken() {
    //check local storage for access token
    const token = readAccessToken();
    let accessToken = token?.accessToken;

    // if there isnt a token then return null (not isgned in)
    if (!token) return null;
    ("not signed in");

    // if there is a token then check expiration
    // if its expired update it using refresh token
    if (isTokenExpired(token.exp)) {
      const newToken = await refreshAccessToken();
      if (!newToken) return null;
      accessToken = newToken;
    }

    // finally return the new token

    return accessToken;
  }
  return async () => {
    const token = typeof window !== "undefined" ? await getAccessToken() : null;

    const res = await fetch("https://api.lens.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options,
        "x-access-token": token ? token : "",
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
  };
};
