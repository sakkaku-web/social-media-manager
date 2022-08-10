import {
  OAuthToken,
  OAuthTokenFromJSON,
  TwitterToken,
  TwitterTokenFromJSON,
} from "../openapi";

const TOKEN_PROVIDER_PREFIX = "sns-manager-tokens-";

type TokenType = TwitterToken | OAuthToken;

export const loadLoginsFromStorage = (provider: string): TokenType[] => {
  const providerKey = TOKEN_PROVIDER_PREFIX + provider;
  return JSON.parse(sessionStorage.getItem(providerKey) || "[]");
};

export const addLoginToStorage = (token: TokenType, provider: string) => {
  const isTwitter = provider.toLowerCase() === "twitter";

  if (
    !token ||
    !token.accessToken ||
    (isTwitter && !(token as TwitterToken).accessSecret)
  ) {
    console.log("Invalid token", token);
    return;
  }

  const providerKey = TOKEN_PROVIDER_PREFIX + provider;
  const logins: TokenType[] = loadLoginsFromStorage(provider);
  if (logins.findIndex((l) => l.accessToken === token.accessToken) === -1) {
    logins.push(token);
    sessionStorage.setItem(providerKey, JSON.stringify(logins));
  } else {
    console.warn("User is already logged in. Ignoring");
  }
};
