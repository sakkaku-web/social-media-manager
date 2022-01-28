import { User } from '@kumi-arts/core';
import { Axios } from 'axios';
import { Client, createClient } from './client';

export class TwitterClient implements Client {
  private client: Axios;

  constructor() {
    this.client = createClient({
      baseURL: '/api/twitter',
    });
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.get('/2/users/me');
    return { id: data.data.username, name: data.data.name };
  }
}
