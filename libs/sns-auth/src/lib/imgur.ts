import { nanoid } from 'nanoid';
import { validateCallbackState } from './sns-auth';
import {
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  OAuthCallbackResponse,
  SNSAuthService,
} from './sns-auth';

interface ImgurOAuthCallback extends OAuthLoginCallback {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

export class ImgurAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  getLoginUrl(redirect: string, scope: string[] = []): OAuthLogin {
    const { clientId } = this.options;
    const state = nanoid();

    const url = new URL(`https://api.imgur.com/oauth2/authorize`);
    url.searchParams.set('response_type', 'token');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('state', state);

    console.log(state);
    return { url: url.toString(), state };
  }

  async handleCallback(
    callback: ImgurOAuthCallback
  ): Promise<OAuthCallbackResponse> {
    validateCallbackState(callback);
    console.log(callback);

    return { token: callback.access_token };
  }
}
