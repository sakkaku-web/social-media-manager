import { MediaPost, SNSClient, User } from './sns-client';
import { TwitterApi } from 'twitter-api-v2';

export class TwitterClient implements SNSClient {
  private client: TwitterApi;

  constructor(token: string) {
    this.client = new TwitterApi(token);
  }
  async postMedia(media: MediaPost) {
    const mediaIds = await Promise.all(
      media.images.map((m) =>
        this.client.v1.uploadMedia(m.data, { type: m.type.split('/')[1] })
      )
    );

    console.log(mediaIds);
  }

  async getUser(): Promise<User> {
    return this.client
      .currentUserV2()
      .then((data) => ({ id: data.data.username, name: data.data.name }));
  }
}
