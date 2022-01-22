import { MediaPost, SNSClient } from './sns-client';
import { User } from '@kumi-arts/core';
import * as Snoowrap from 'snoowrap';

export class RedditClient implements SNSClient {
  private client: Snoowrap;

  constructor(token: string) {
    this.client = new Snoowrap({
      userAgent: 'kumi-arts:0.0.0 (by /u/illu11)',
      accessToken: token,
    });
  }
  postMedia(media: MediaPost) {
    throw new Error('Method not implemented.');
  }

  async getUser(): Promise<User> {
    const name = await this.client.getMe().name;
    if (!name) {
      throw new Error('Failed to get user');
    }

    return { id: name, name };
  }
}
