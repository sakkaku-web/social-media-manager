import { SNSClient, User } from './sns-client';
import * as Snoowrap from 'snoowrap';

export class RedditClient implements SNSClient {
  private client: Snoowrap;

  constructor(token: string) {
    this.client = new Snoowrap({
      userAgent: 'kumi-arts:0.0.0 (by /u/illu11)',
      accessToken: token,
    });
  }

  async getUser(): Promise<User> {
    const name = await this.client.getMe().name;
    return { id: name, name };
  }
}
