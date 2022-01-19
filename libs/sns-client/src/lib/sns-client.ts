import { AxiosResponse } from 'axios';

export interface User {
  id: string;
  name: string;
}

export interface SNSClient {
  getUser(): Promise<User>;
}

export const jsonParseInterceptor = (res: AxiosResponse) => {
  if (typeof res.data === 'string' && res.data.startsWith('{')) {
    res.data = JSON.parse(res.data);
  }

  return res;
};
