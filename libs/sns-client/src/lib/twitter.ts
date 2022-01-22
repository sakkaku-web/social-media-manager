import { MediaPost, SNSClient } from './sns-client';
import { User } from '@kumi-arts/core';
import { TwitterApi } from 'twitter-api-v2';

export class TwitterClient implements SNSClient {
  private client: TwitterApi;

  constructor(token: string) {
    this.client = new TwitterApi(token);
  }
  async postMedia({ text, images }: MediaPost): Promise<string> {
    return await this.client.v2
      .tweet(text, {
        media: {
          media_ids: images,
        },
      })
      .then((result) => result.data.id);
  }

  async getUser(): Promise<User> {
    return this.client
      .currentUserV2()
      .then((data) => ({ id: data.data.username, name: data.data.name }));
  }
}
