//1. reading access token from storage
//2. setting the access token in storage
//3. parse the jwt token that coems back and extract the exp date field

const STORAGE_KEY = "LH_STORAGE_KEY";

//simple funcition to say if token is expired or not
export function isTokenExpired(exp: number) {
  if (!exp) return true;
  if (Date.now() >= exp * 1000) {
    return true;
  }
  return false;
}

export function readAccessToken(): {
  accessToken: string;
  refreshToken: string;
  exp: number;
} | null {
  if (typeof window == "undefined") return null;
  const ls = localStorage || window.localStorage;
  if (!ls) {
    throw new Error("Local storage is not available");
  }

  const data = ls.getItem(STORAGE_KEY);
  if (!data) return null;

  return JSON.parse(data);
}

export function setAccessToken(accessToken: string, refreshToken: string) {
  //1. parse the JWT token to get the expiration date
  const { exp } = parseJwt(accessToken);
  //2. set al three variables in side local storage using the storage key
  const ls = localStorage || window.localStorage;

  if (!ls) {
    throw new Error("Local storage is not available");
  }

  ls.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, exp }));
}

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
