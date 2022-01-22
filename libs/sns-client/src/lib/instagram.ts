import { Axios } from 'axios';
import { jsonParseInterceptor, MediaPost, SNSClient } from './sns-client';
import { User } from '@kumi-arts/core';

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
  postMedia(media: MediaPost) {
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
}
