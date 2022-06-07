import { SNSMedia, SNSPost, SocialProvider, User } from '@kumi-arts/core';
import { Axios } from 'axios';
import { Client, createClient } from './client';

export interface PinterestPost extends SNSPost {
  board: string;
}

export class PinterestClient implements Client {
  private client: Axios;

  constructor() {
    this.client = createClient(SocialProvider.PINTEREST, {
      baseURL: '/api/pinterest',
    });
  }

  async postMedia(post: PinterestPost): Promise<string> {
    const body = {
      title: post.title,
      board_id: post.board,
      description: post.text,
      media_source: {
        source_type: 'image_base64',
        data: await this.fileToBase64(post.media?.image),
        content_type: this.getType(post.media),
      },
    };
    const { data } = await this.client.post('/pins', JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
    });

    return data.id;
  }

  private fileToBase64(file?: File) {
    return new Promise((resolve) => {
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      // Read file content on file loaded event
      reader.onload = function (event) {
        resolve(event?.target?.result?.toString().split(',', 2)[1]);
      };

      // Convert data to base64
      reader.readAsDataURL(file);
    });
  }

  private getType(image?: SNSMedia): string {
    if (!image) return '';
    const [_, ext] = image.filename.split('.');
    return `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  }

  async getUser(): Promise<User> {
    return this.client.get('/user_account').then(({ data }) => {
      return { id: data.username, name: data.username };
    });
  }

  async getBoards(): Promise<Board[]> {
    return this.client.get('/boards').then((res) => res.data.items);
  }
}

export interface Board {
  id: string;
  name: string;
}
