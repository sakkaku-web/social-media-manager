import { SocialMediaService, User } from '@kumi-arts/core';
import { TwitterApi } from 'twitter-api-v2';

export class TwitterService implements SocialMediaService {
  private client: TwitterApi;

  constructor(bearer: string) {
    this.client = new TwitterApi(bearer);
  }

  getProfileLink(username: string) {
    return `https://twitter.com/${username}`;
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.currentUserV2();
    return {
      username: data.username,
    };
  }

  createPost() {}
}
