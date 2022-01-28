import { User } from '@kumi-arts/core';
import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';

const jsonParseInterceptor = (res: AxiosResponse) => {
  if (typeof res.data === 'string' && res.data.startsWith('{')) {
    res.data = JSON.parse(res.data);
  }

  return res;
};

const unsuccessfulInterceptor = (res: AxiosResponse) => {
  if (res.status < 200 || res.status >= 300) {
    throw new HttpError(res.status, res.data);
  }

  return res;
};

export const createClient = (config: AxiosRequestConfig) => {
  const client = new Axios({
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  client.interceptors.response.use(jsonParseInterceptor);
  client.interceptors.response.use(unsuccessfulInterceptor);
  return client;
};

export interface Client {
  getUser(): Promise<User>;
}

export class HttpError extends Error {
  constructor(public status: number, public data: Record<string, any>) {
    super(`Failed with status ${status}`);
  }
}
