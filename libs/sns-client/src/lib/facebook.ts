import { SNSClient } from './sns-client';
import { Axios } from 'axios';
import { User } from './sns-client';
import { jsonParseInterceptor } from '..';

export class FacebookClient implements SNSClient {
  private client: Axios;

  constructor(token: string) {
    this.client = new Axios({
      baseURL: 'https://graph.facebook.com/',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.response.use(jsonParseInterceptor);
  }

  async getUser(): Promise<User> {
    return this.client.get('/me').then(({ data }) => ({
      id: data.id,
      name: data.name,
    }));
  }
}
