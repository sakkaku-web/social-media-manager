import axios from 'axios';
import { nanoid } from 'nanoid';
import {
  SNSAuthService,
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  validateCallbackState,
  OAuthCallbackResponse,
} from '../auth';

export class PinterestAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  async getLoginUrl(redirect: string): Promise<OAuthLogin> {
    const { clientId } = this.options;
    const state = nanoid();
    const url = new URL('https://www.pinterest.com/oauth/');
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('redirect_uri', redirect);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append(
      'scope',
      'boards:read,boards:write,pins:read,pins:write,user_accounts:read'
    );
    url.searchParams.append('state', state);
    return { url: url.toString(), state };
  }

  async handleCallback(
    callback: OAuthLoginCallback
  ): Promise<OAuthCallbackResponse> {
    validateCallbackState(callback);

    const { clientId, clientSecret } = this.options;

    const params = new URLSearchParams();
    params.append('code', callback.code);
    params.append('redirect_uri', callback.redirect);
    params.append('grant_type', 'authorization_code');

    const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString(
      'base64'
    );
    const response = await axios.post(
      `https://api.pinterest.com/v5/oauth/token`,
      params,
      {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`${response.status} - ${response.data}`);
    }

    return { token: response.data.access_token };
  }
}
