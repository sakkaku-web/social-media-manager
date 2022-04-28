import { Axios } from 'axios';
import { SNSPost, SocialProvider, User } from '@kumi-arts/core';
import { Client, createClient } from './client';

export class FacebookClient implements Client {
  private client: Axios;

  constructor() {
    this.client = createClient(SocialProvider.FACEBOOK, {
      baseURL: '/api/facebook',
    });
  }

  async getUser(): Promise<User> {
    return this.client.get('/me').then(({ data }) => ({
      id: data.id,
      name: data.name,
    }));
  }

  async postMedia(post: SNSPost): Promise<string> {
    const { id } = await this.getUser();
    const { data: d } = await this.client.get('/me/permissions');
    console.log(d);

    const { data } = await this.client.post(`${id}_51428047474/media`, null, {
      params: {
        image_url: 'https://placekitten.com/320/400',
      },
    });

    console.log(data);
    return '';
  }

  async uploadImage(data: Buffer, filename: string): Promise<string> {
    throw new Error('Method not implemented');
  }
}
