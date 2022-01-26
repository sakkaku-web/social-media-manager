import { AxiosResponse } from 'axios';
import { Group, SNSMedia, SNSPost, User } from '@kumi-arts/core';

export interface SNSClient {
  getUser(): Promise<User>;
  postMedia(media: SNSPost, image?: SNSMedia): Promise<string>;
  getGroups(): Promise<Group[]>;
}

export const jsonParseInterceptor = (res: AxiosResponse) => {
  if (typeof res.data === 'string' && res.data.startsWith('{')) {
    res.data = JSON.parse(res.data);
  }

  return res;
};
