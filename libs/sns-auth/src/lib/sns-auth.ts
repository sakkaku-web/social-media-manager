export enum SNSProvider {
  TWITTER,
  REDDIT,
  FACEBOOK,
  INSTAGRAM,
}

export interface OAuthCallbackResponse {
  token: string;
}

export interface OAuthLogin {
  state: string;
  url: string;
}

export interface OAuthLoginCallback {
  state: string;
  code: string;
  error?: string;
  originalState: string;
  redirect: string;
}

export interface OAuthOptions {
  clientId: string;
  clientSecret: string;
}

export interface SNSAuthService {
  getLoginUrl(redirect: string, scopes?: string[]): Promise<OAuthLogin>;
  handleCallback(data: OAuthLoginCallback): Promise<OAuthCallbackResponse>;
}

export function validateCallbackState(callback: OAuthLoginCallback) {
  if (callback.state != callback.originalState) {
    throw new Error('State mismatch');
  }

  if (callback.error) {
    throw new Error(callback.error);
  }
}
