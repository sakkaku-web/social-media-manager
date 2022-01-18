import { nanoid } from 'nanoid';

export interface AuthCallbackResponse {
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
}

export interface OAuthOptions {
  clientId: string;
  clientSecret: string;
}

export class SocialMediaService {
  constructor() {}

  getLoginUrl(redirect: string): OAuthLogin {}

  handleCallback(data: OAuthLoginCallback): AuthCallbackResponse {}
}

export class FacebookService extends SocialMediaService {
  constructor(private options: OAuthOptions) {
    super();
  }

  getLoginUrl(redirect: string): OAuthLogin {
    const { clientId } = this.options;
    const state = nanoid();
    const url = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${callback}&state=${state}`;
    return { url, state };
  }

  handleCallback(): AuthCallbackResponse {}
}
