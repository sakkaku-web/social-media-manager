import type { Token } from "src/lib/auth";
import { OAuthToken, OAuthTokenFromJSON, PixivToken, TwitterToken, TwitterTokenFromJSON } from "../openapi";

const TOKEN_PROVIDER_PREFIX = "sns-manager-tokens-";

const storage = localStorage;

export type TokenType = TwitterToken | PixivToken | OAuthToken;

export type Provider = 'reddit' | 'twitter' | 'pinterest' | 'pixiv'

const createProviderKey = (provider: Provider) => TOKEN_PROVIDER_PREFIX + provider;

export const loadLoginTokens = (provider: Provider): Token[] => {
  const key = createProviderKey(provider);
  return JSON.parse(storage.getItem(key) || "[]");
};

export const addLoginToken = (token: any, provider: Provider) => {
  const logins: Token[] = loadLoginTokens(provider);
  if (logins.findIndex((l) => l.token === token.accessToken) === -1) {
    const saveToken = oauthToToken(token, provider);
    if (saveToken) {
      logins.push(saveToken);
      updateTokens(logins, provider)
    } else {
      console.log('Invalid token');
    }
  } else {
    console.warn("User is already logged in. Ignoring");
  }
};

const oauthToToken = (oauth: any, provider: Provider): Token | null => {
  const isTwitter = provider === "twitter";
  const token = isTwitter
    ? TwitterTokenFromJSON(oauth)
    : OAuthTokenFromJSON(oauth);

  if (
    !token ||
    !token.accessToken ||
    (isTwitter && !(token as TwitterToken).accessSecret)
  ) {
    return null;
  }

  return { token: token.accessToken, refreshToken: token['refreshToken'] };
}

export const updateLoginToken = (token: Token, newToken: any, provider: Provider): Token => {
  const tokens = loadLoginTokens(provider);
  const oldTokenIdx = tokens.findIndex(t => t.token === token.token);
  const saveToken = oauthToToken(newToken, provider);
  if (saveToken) {
    tokens[oldTokenIdx] = saveToken;
    updateTokens(tokens, provider);
    return saveToken;
  }

  console.log('Invalid token', newToken);
  return null;
}

export const removeLoginToken = (token: Token, provider: Provider) => {
  const tokens = loadLoginTokens(provider);
  const filtered = tokens.filter(t => t.token !== token.token);
  updateTokens(filtered, provider);
}

const updateTokens = (tokens: Token[], provider: Provider) => {
  const key = createProviderKey(provider);
  storage.setItem(key, JSON.stringify(tokens));
}
