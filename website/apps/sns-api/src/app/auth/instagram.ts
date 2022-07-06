import axios from 'axios';
import { nanoid } from 'nanoid';
import {
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  OAuthCallbackResponse,
  SNSAuthService,
  validateCallbackState,
} from './sns-auth';
import * as FormData from 'form-data';

export class InstagramAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  async getLoginUrl(redirect: string): Promise<OAuthLogin> {
    const { clientId } = this.options;
    const state = nanoid();
    const url = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=user_profile&response_type=code&state=${state}`;
    return { url, state };
  }

  async handleCallback(
    callback: OAuthLoginCallback
  ): Promise<OAuthCallbackResponse> {
    validateCallbackState(callback);
    console.log(callback);

    const { clientId, clientSecret } = this.options;

    const body = new FormData();
    body.append('client_id', clientId);
    body.append('client_secret', clientSecret);
    body.append('code', callback.code);
    body.append('grant_type', 'authorization_code');
    body.append('redirect_uri', callback.redirect);

    const { data, status } = await axios.post(
      `https://api.instagram.com/oauth/access_token`,
      body,
      {
        headers: body.getHeaders(),
      }
    );

    if (status !== 200) {
      throw new Error(`${status} - ${data}`);
    }

    return { token: data.access_token };
  }
}
