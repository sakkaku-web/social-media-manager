import { SocialProvider, User } from '@kumi-arts/core';
import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toaster } from 'evergreen-ui';

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

const notifyRequestThrottle = (provider: SocialProvider) => {
  return (res: AxiosResponse) => {
    if (res.status === 429) {
      toaster.danger(`Too many requests for ${provider}`, {
        id: `429-${provider}`,
        description: `Try again after 1 minute.`,
      });
    }

    return res;
  };
};

export const createClient = (
  provider: SocialProvider,
  config: AxiosRequestConfig
) => {
  const client = new Axios({
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  client.interceptors.response.use(jsonParseInterceptor);
  client.interceptors.response.use(notifyRequestThrottle(provider));
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
