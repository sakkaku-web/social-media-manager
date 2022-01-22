import { Axios, AxiosResponse } from 'axios';
import { SNSPost, SocialProvider, User } from '@kumi-arts/core';

export class ApiClient {
  private client: Axios;

  constructor(baseURL: string) {
    this.client = new Axios({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private providerLink(provider: SocialProvider, url: string): string {
    return `${provider}/${url}`;
  }

  async getToken(provider: SocialProvider): Promise<string> {
    return this.client
      .get(this.providerLink(provider, 'token'))
      .then((res) => this.handleResponse(res));
  }

  async getUser(provider: SocialProvider): Promise<User> {
    return this.client
      .get(this.providerLink(provider, 'user'))
      .then((res) => this.handleResponse(res));
  }

  async postSNS(
    provider: SocialProvider,
    body: SNSPost,
    images: File[]
  ): Promise<void> {
    const data = new FormData();
    const records = body as unknown as Record<string, string>;
    Object.keys(records).map((k) => {
      data.append(k, records[k]);
    });
    images.forEach((img) => data.append('images', img, img.name));

    this.client
      .post(this.providerLink(provider, 'post'), data)
      .then(this.handleResponse);
  }

  private handleResponse<T>(res: AxiosResponse): T {
    if (res.status !== 200) {
      throw new Error(res.data);
    }
    if (typeof res.data === 'string' && res.data.startsWith('{')) {
      return JSON.parse(res.data);
    }

    return res.data;
  }
}
