import { Axios, AxiosResponse } from 'axios';
import { SNSPost, SocialProvider, User } from '@kumi-arts/core';

export class ApiClient {
  private client: Axios;

  constructor(private baseURL: string) {
    this.client = new Axios({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private providerLink(provider: SocialProvider, url: string): string {
    return `${provider}/${url}`;
  }

  getLoginLink(provider: SocialProvider): string {
    return `${this.baseURL}/${this.providerLink(provider, 'login')}`;
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
    if (res.status !== 200) {
      throw new Error(res.data);
    }
    return JSON.parse(res.data);
  }
}
