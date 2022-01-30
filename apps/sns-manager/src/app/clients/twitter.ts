import { SNSPost, SocialProvider, User } from '@kumi-arts/core';
import { Axios } from 'axios';
import { Client, createClient } from './client';

export class TwitterClient implements Client {
  private client: Axios;

  constructor() {
    this.client = createClient(SocialProvider.TWITTER, {
      baseURL: '/api/twitter',
    });
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.get('/2/users/me');
    return { id: data.data.username, name: data.data.name };
  }

  async postMedia(post: SNSPost): Promise<string> {
    let media = undefined;
    if (post.media?.image) {
      const body = new FormData();
      body.append('media', post.media.image);
      const { data } = await this.client.post('/1.1/media/upload.json', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      media = { media_ids: [data.media_id_string] };
    }

    const body = {
      text: post.text,
      media,
    };
    const { data } = await this.client.post('/2/tweets', JSON.stringify(body));

    return data.data.id;
  }
}
