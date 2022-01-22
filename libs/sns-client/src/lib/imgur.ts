import { Axios } from 'axios';
import { jsonParseInterceptor, MediaPost, SNSClient } from './sns-client';
import { User } from '@kumi-arts/core';

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

  async uploadImage(image: File): Promise<string> {
    const body = new FormData();
    body.append('image', image);
    body.append('name', image.name);

    const { data } = await this.client.post('/3/image', body, {});
    return data.data.link;
  }

  async postMedia(media: MediaPost) {
    // const links = await Promise.all(
    //   media.images.map((i) => this.uploadImage(i))
    // );
    // console.log(links);
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.get('/3/account/me/settings');
    const name = data.data.account_url;
    return { id: name, name };
  }
}
