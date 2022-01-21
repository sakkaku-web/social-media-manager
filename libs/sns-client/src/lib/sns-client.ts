import { AxiosResponse } from 'axios';

export interface MediaPost {
  text: string;
  images: MediaImage[];
}

export interface MediaImage {
  filename: string;
  data: Buffer;
  type: string;
}

export interface User {
  id: string;
  name: string;
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
