import { Axios } from 'axios';
import { jsonParseInterceptor, SNSClient } from './sns-client';
import { SNSPost, User } from '@kumi-arts/core';

export class InstagramClient implements SNSClient {
  private client: Axios;

  constructor(token: string) {
    this.client = new Axios({
      baseURL: 'https://api.instagram.com',
      params: {
        access_token: token,
      },
    });

    this.client.interceptors.response.use(jsonParseInterceptor);
  }
  postMedia(media: SNSPost): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getUser(): Promise<User> {
    return this.client
      .get('/me', { params: { fields: 'id,username' } })
      .then(({ data }) => ({
        id: data.id,
        name: data.username,
      }));
  }

  async uploadImage(data: Buffer, filename: string): Promise<string> {
    throw new Error('Method not implemented');
  }
}
