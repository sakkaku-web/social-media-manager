import { User } from '@kumi-arts/core';

export interface Client {
  getUser(): Promise<User>;
}
