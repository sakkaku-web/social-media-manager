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

export class FacebookAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  getLoginUrl(redirect: string): OAuthLogin {
    const { clientId } = this.options;
    const state = nanoid();
    const url = `https://www.facebook.com/dialog/oauth?client_id=${clientId}&redirect_uri=${redirect}&state=${state}`;
    return { url, state };
  }

  async handleCallback(
    callback: OAuthLoginCallback
  ): Promise<OAuthCallbackResponse> {
    validateCallbackState(callback);

    const { clientId, clientSecret } = this.options;
    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: callback.redirect,
      code: callback.code,
    };

    const response = await axios.get(
      `https://graph.facebook.com/oauth/access_token`,
      { params }
    );

    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }

    return { token: response.data.access_token };
  }
}
