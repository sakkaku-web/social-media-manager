import { AxiosResponse } from 'axios';
import { User } from '@kumi-arts/core';

export interface MediaPost {
  text: string;
  images: MediaImage[];
}

export interface MediaImage {
  filename: string;
  data: Buffer;
}

export interface SNSClient {
  getUser(): Promise<User>;
  postMedia(media: MediaPost);
}

export const jsonParseInterceptor = (res: AxiosResponse) => {
  if (typeof res.data === 'string' && res.data.startsWith('{')) {
    res.data = JSON.parse(res.data);
  }

  return res;
};
