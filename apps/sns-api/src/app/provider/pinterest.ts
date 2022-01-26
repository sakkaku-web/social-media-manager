import { Group, SNSMedia, SNSPost, User } from '@kumi-arts/core';
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
import { ImgurClient, jsonParseInterceptor, SNSClient } from '../client';

export class PinterestAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  async getLoginUrl(redirect: string): Promise<OAuthLogin> {
    const { clientId } = this.options;
    const state = nanoid();
    const url = new URL('https://www.pinterest.at/oauth/');
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

  async postMedia(media: SNSPost, image: SNSMedia): Promise<string> {
    if (!image) return null;

    const body = {
      title: media.title,
      board_id: media.group,
      description: media.text,
      media_source: {
        source_type: 'image_base64',
        data: image.image.toString('base64'),
        content_type: this.getType(image),
      },
    };
    const { data, status, statusText } = await this.client.post(
      '/pins',
      JSON.stringify(body),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return data.id;
  }

  private getType(image: SNSMedia) {
    const [_, ext] = image.filename.split('.');
    return `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  }

  async getUser(): Promise<User> {
    return this.client.get('/user_account').then(({ data }) => {
      return { id: data.username, name: data.username };
    });
  }

  async getGroups(): Promise<Group[]> {
    return this.client.get('boards').then((res) => res.data.items);
  }
}
