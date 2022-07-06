import { Axios } from 'axios';
import { SNSPost, SocialProvider, User } from '@kumi-arts/core';
import { Client, createClient } from './client';

export class InstagramClient implements Client {
  private client: Axios;

  constructor() {
    this.client = createClient(SocialProvider.INSTAGRAM, {
      baseURL: '/api/instagram',
    });
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
