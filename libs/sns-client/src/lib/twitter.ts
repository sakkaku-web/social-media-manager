import { SNSClient } from './sns-client';
import { SNSPost, User } from '@kumi-arts/core';
import { TwitterApi } from 'twitter-api-v2';

export class TwitterClient implements SNSClient {
  private client: TwitterApi;

  constructor(token: string, clientId: string, clientSecret: string) {
    // this.client = new TwitterApi(token);
    const [accessToken, secret] = token.split(';');

    this.client = new TwitterApi({
      appKey: clientId,
      appSecret: clientSecret,
      accessToken: accessToken,
      accessSecret: secret,
    });
  }

  async postMedia({ text, images }: SNSPost): Promise<string> {
    return await this.client.v2
      .tweet(`${text}\n\n${images.join('\n')}`)
      .then((res) => res.data.id);
  }

  async getUser(): Promise<User> {
    return this.client
      .currentUser()
      .then((data) => ({ id: data.screen_name, name: data.name }));
  }

  async uploadImage(file: Buffer, filename: string): Promise<string> {
    return await this.client.v1.uploadMedia(file, {
      type: filename.split('.')[1],
    });
  }
}
