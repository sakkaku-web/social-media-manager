import { Axios } from 'axios';
import { jsonParseInterceptor, MediaPost, SNSClient, User } from './sns-client';

export class ImgurClient implements SNSClient {
  private client: Axios;

  constructor(token: string) {
    this.client = new Axios({
      baseURL: 'https://api.imgur.com',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.client.interceptors.response.use(jsonParseInterceptor);
  }
  postMedia(media: MediaPost) {
    throw new Error('Method not implemented.');
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.get('/3/account/me/settings');
    const name = data.data.account_url;
    return { id: name, name };
  }
}
