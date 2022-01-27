import { Group, SNSMedia, SNSPost, User } from '@kumi-arts/core';
import { Axios } from 'axios';
import { Client, createClient } from './client';

export class PinterestClient implements Client {
  private client: Axios;

  constructor() {
    this.client = createClient({
      baseURL: '/api/pinterest',
    });
  }

  async postMedia(media: SNSPost, image: SNSMedia): Promise<string> {
    if (!image) return '';

    const body = {
      title: media.title,
      board_id: media.group,
      description: media.text,
      media_source: {
        source_type: 'image_base64',
        data: image.image.toString('base64'),
        content_type: this.getType(image),
      },
    };
    const { data } = await this.client.post('/pins', JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    });

    return data.id;
  }

  private getType(image: SNSMedia) {
    const [_, ext] = image.filename.split('.');
    return `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  }

  async getUser(): Promise<User> {
    return this.client.get('/user_account').then(({ data }) => {
      return { id: data.username, name: data.username };
    });
  }

  async getGroups(): Promise<Group[]> {
    return this.client.get('/boards').then((res) => res.data.items);
  }
}
