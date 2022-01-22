import { Axios } from 'axios';
import * as FormData from 'form-data';
import { jsonParseInterceptor, MediaPost, SNSClient } from './sns-client';
import { User } from '@kumi-arts/core';
import { MediaImage } from '..';

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

  async uploadImage({ data: f, filename }: MediaImage): Promise<string> {
    const body = new FormData();
    body.append('image', f.toString('base64'));
    body.append('name', filename);

    const { data } = await this.client.post('/3/image', body, {
      headers: { ...body.getHeaders() },
    });
    return data.data.link;
  }

  async postMedia(media: MediaPost) {
    const links = await Promise.all(
      media.images.map((i) => this.uploadImage(i))
    );
    console.log(links);
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.get('/3/account/me/settings');
    const name = data.data.account_url;
    return { id: name, name };
  }
}
