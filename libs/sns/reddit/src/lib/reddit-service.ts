import { SocialMediaService, User } from '@kumi-arts/core';
import * as Snoowrap from 'snoowrap';

export class RedditService implements SocialMediaService {
  private client: Snoowrap;

  constructor(bearer: string) {
    this.client = new Snoowrap({
      userAgent: 'kumi-arts:0.0.0 (by /u/illu11)',
      accessToken: bearer,
    });
  }

  getProfileLink(username: string) {
    return `https://reddit.com/u/${username}`;
  }

  async getUser(): Promise<User> {
    const user = this.client.getMe();
    const name = await user.name;

    return {
      username: name,
    };
  }

  createPost() {}
}
