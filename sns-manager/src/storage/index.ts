import type { Token } from "src/lib/auth";
import { OAuthToken, PixivToken, TwitterToken } from "../openapi";

const TOKEN_PROVIDER_PREFIX = "sns-manager-tokens-";

const storage = localStorage;

type TokenType = TwitterToken | PixivToken | OAuthToken;

export const loadLoginsFromStorage = (provider: string): Token[] => {
  const providerKey = TOKEN_PROVIDER_PREFIX + provider;
  return JSON.parse(storage.getItem(providerKey) || "[]");
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
  const logins: Token[] = loadLoginsFromStorage(provider);
  if (logins.findIndex((l) => l.token === token.accessToken) === -1) {
    logins.push({ token: token.accessToken, refreshToken: token['refreshToken'] });
    storage.setItem(providerKey, JSON.stringify(logins));
  } else {
    console.warn("User is already logged in. Ignoring");
  }
};
