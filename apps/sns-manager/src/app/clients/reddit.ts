import { SNSPost, User } from '@kumi-arts/core';
import { Axios } from 'axios';

export class RedditClient {
  private client: Axios;

  constructor(token: string) {
    this.client = new Axios({
      headers: {
        'User-Agent': 'sns-manager:0.0.0 (by /u/illu11)',
      },
    });
  }

  postMedia(media: SNSPost): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.get('');
    if (!data.name) {
      throw new Error('Failed to get user');
    }

    return { id: data.name, name: data.name };
  }

  async uploadImage(data: Buffer, filename: string): Promise<string> {
    throw new Error('Method not implemented');
  }
}
