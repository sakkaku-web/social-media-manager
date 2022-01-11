import { SocialMediaService, User } from '@kumi-arts/core';
import { TwitterApi } from 'twitter-api-v2';

export class TwitterService implements SocialMediaService {
  private client: TwitterApi;

  constructor(bearer: string) {
    this.client = new TwitterApi(bearer);
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.currentUserV2();
    return {
      name: data.name,
      username: data.username,
    };
  }

  createPost() {}
}
