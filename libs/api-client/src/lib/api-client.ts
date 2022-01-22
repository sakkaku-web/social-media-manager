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

  async postSNS(provider: SocialProvider, body: SNSPost): Promise<void> {
    this.client
      .post(this.providerLink(provider, 'post'), JSON.stringify(body))
      .then(this.handleResponse);
  }

  private handleResponse<T>(res: AxiosResponse): T {
    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.data);
    }
    if (
      typeof res.data === 'string' &&
      (res.data.startsWith('{') || res.data.startsWith('['))
    ) {
      return JSON.parse(res.data);
    }

    return res.data;
  }

  async upload(provider: SocialProvider, images: File[]): Promise<string[]> {
    const data = new FormData();
    images.forEach((img) => data.append('images', img, img.name));

    return this.client
      .post(this.providerLink(provider, 'upload'), data)
      .then((res) => this.handleResponse(res));
  }
}
