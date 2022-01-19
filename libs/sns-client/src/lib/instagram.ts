import { Axios } from 'axios';
import { jsonParseInterceptor, SNSClient, User } from './sns-client';

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

  async getUser(): Promise<User> {
    return this.client
      .get('/me', { params: { fields: 'id,username' } })
      .then(({ data }) => ({
        id: data.id,
        name: data.username,
      }));
  }
}
