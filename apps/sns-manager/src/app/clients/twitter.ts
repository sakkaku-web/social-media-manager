import { User } from '@kumi-arts/core';
import { Client } from './client';

export class TwitterClient implements Client {
  async getUser(): Promise<User> {
    throw new Error('Not implemented');
  }
}
