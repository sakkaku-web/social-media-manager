import { SNSPost, User } from '@kumi-arts/core';
import axios, { Axios } from 'axios';
import { nanoid } from 'nanoid';
import {
  SNSAuthService,
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  validateCallbackState,
  OAuthCallbackResponse,
} from '../auth';
import { jsonParseInterceptor, SNSClient } from '../client';

export class PinterestAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  async getLoginUrl(redirect: string): Promise<OAuthLogin> {
    const { clientId } = this.options;
    const state = nanoid();
    const url = new URL('https://www.pinterest.at/oauth/');
    url.searchParams.append('client_id', clientId);
    url.searchParams.append('redirect_uri', redirect);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', 'pins:write,user_accounts:read');
    url.searchParams.append('state', state);
    console.log(url.toString());
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

    const encoded = btoa(`${clientId}:${clientSecret}`);
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

export class PinterestClient implements SNSClient {
  private client: Axios;

  constructor(token: string) {
    this.client = new Axios({
      baseURL: 'https://api.pinterest.com/v5',
      headers: {
        Authorization: `Bearer ${token.replace('\r\n', '')}`,
      },
    });

    this.client.interceptors.response.use(jsonParseInterceptor);
  }

  async uploadImage(file: Buffer, filename: string): Promise<string> {
    throw new Error('implement');
  }

  async postMedia(media: SNSPost): Promise<string> {
    throw new Error('implement');
  }

  async getUser(): Promise<User> {
    return this.client.get('/user_account').then(({ data }) => {
      return { id: data.username, name: data.username };
    });
  }
}
