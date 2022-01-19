import axios from 'axios';
import { nanoid } from 'nanoid';
import { BaseAuthService } from './sns-auth';
import {
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  OAuthCallbackResponse,
} from './sns-auth';

export class InstagramAuthService extends BaseAuthService {
  constructor(private options: OAuthOptions) {
    super();
  }

  getLoginUrl(redirect: string): OAuthLogin {
    const { clientId } = this.options;
    const state = nanoid();
    const url = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=user_profile&response_type=code&state=${state}`;
    return { url, state };
  }

  async handleCallback(
    callback: OAuthLoginCallback
  ): Promise<OAuthCallbackResponse> {
    this.validateCallbackState(callback);

    const { clientId, clientSecret } = this.options;

    const { data, status } = await axios.post(
      `https://api.instagram.com/oauth/access_token`,
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: callback.code,
        grant_type: 'authorization_code',
        redirect_uri: callback.redirect,
      }
    );

    if (status !== 200) {
      throw new Error(`${status} - ${data}`);
    }

    return { token: data.access_token };
  }
}
