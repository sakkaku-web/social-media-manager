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

export interface OAuthState {
  state: string;
  redirect: string;
}

export interface OAuthLoginCallback {
  state: string;
  code: string;
  error?: string;
}

export interface OAuthOptions {
  clientId: string;
  clientSecret: string;
}

export interface SNSAuthService {
  getLoginUrl(redirect: string): OAuthLogin;
  handleCallback(
    data: OAuthLoginCallback,
    login: OAuthState
  ): Promise<OAuthCallbackResponse>;
}
