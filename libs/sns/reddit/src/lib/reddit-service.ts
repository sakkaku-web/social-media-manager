import { SocialMediaService, User } from '@kumi-arts/core';
import { Axios } from 'axios';
import * as Snoowrap from 'snoowrap';

export class RedditService implements SocialMediaService {
  private client: Snoowrap;

  constructor(bearer: string) {
    // this.client = new Axios({
    //   baseURL: 'https://oauth.reddit.com/',
    //   headers: {
    //     Authorization: `Bearer ${bearer}`,
    //     'User-Agent': 'kumi-arts:0.0.0 (by /u/illu11)',
    //   },
    // });
    this.client = new Snoowrap({
      userAgent: 'kumi-arts:0.0.0 (by /u/illu11)',
      accessToken: bearer,
    });
  }

  async getUser(): Promise<User> {
    // const { data } = await this.client.get('/api/v1/me');
    const user = this.client.getMe();
    const name = await user.name;

    return {
      name: name,
      username: name,
    };
  }

  createPost() {}
}
