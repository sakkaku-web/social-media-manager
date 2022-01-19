import axios from 'axios';
import { nanoid } from 'nanoid';
import { BaseAuthService } from './sns-auth';
import {
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  OAuthCallbackResponse,
} from './sns-auth';

export class FacebookAuthService extends BaseAuthService {
  constructor(private options: OAuthOptions) {
    super();
  }

  getLoginUrl(redirect: string): OAuthLogin {
    const { clientId } = this.options;
    const state = nanoid();
    const url = `https://www.facebook.com/dialog/oauth?client_id=${clientId}&redirect_uri=${redirect}&state=${state}`;
    return { url, state };
  }

  async handleCallback(
    callback: OAuthLoginCallback
  ): Promise<OAuthCallbackResponse> {
    this.validateCallbackState(callback);


    const { clientId, clientSecret } = this.options;
    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: callback.redirect,
      code: callback.code,
    };

    const response = await axios.get(
      `https://graph.facebook.com/oauth/access_token?${params}`,
      { params }
    );

    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }

    return { token: response.data.access_token };
  }
}
