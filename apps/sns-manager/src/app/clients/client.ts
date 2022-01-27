import { User } from '@kumi-arts/core';
import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';

const jsonParseInterceptor = (res: AxiosResponse) => {
  if (typeof res.data === 'string' && res.data.startsWith('{')) {
    res.data = JSON.parse(res.data);
  }

  return res;
};

export const createClient = (config: AxiosRequestConfig) => {
  const client = new Axios(config);
  client.interceptors.response.use(jsonParseInterceptor);
  return client;
};

export interface Client {
  getUser(): Promise<User>;
}
