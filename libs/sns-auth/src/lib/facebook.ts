import { Axios } from 'axios';
import { nanoid } from 'nanoid';
import { OAuthState } from '..';
import {
  SNSAuthService,
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  OAuthCallbackResponse,
} from './sns-auth';

export class FacebookAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  getLoginUrl(redirect: string): OAuthLogin {
    const { clientId } = this.options;
    const state = nanoid();
    const url = `https://www.facebook.com/dialog/oauth?client_id=${clientId}&redirect_uri=${redirect}&state=${state}`;
    return { url, state };
  }

  async handleCallback(
    callback: OAuthLoginCallback,
    login: OAuthState
  ): Promise<OAuthCallbackResponse> {
    if (callback.state != login.state) {
      throw new Error('State mismatch');
    }

    if (callback.error) {
      throw new Error(callback.error);
    }

    const { clientId, clientSecret } = this.options;
    const params = `client_id=${clientId}&redirect_uri=${login.redirect}&client_secret=${clientSecret}&code=${callback.code}`;

    const response = await new Axios().get(
      `https://graph.facebook.com/oauth/access_token?${params}`
    );

    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }

    return { token: response.data.access_token };
  }
}
