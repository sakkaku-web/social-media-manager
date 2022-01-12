import { Axios, AxiosRequestHeaders } from 'axios';
import { SocialProvider, User } from '@kumi-arts/core';

export interface AuthToken {
  token: string;
}

export interface ProviderRequest {
  provider: SocialProvider;
  token: string;
}

export class ApiClient {
  private client: Axios;

  constructor(private baseUrl: string) {
    this.client = new Axios({
      baseURL: baseUrl,
    });
  }

  private providerLink(provider: SocialProvider, url: string): string {
    return `${provider}/${url}`;
  }

  getLoginLink(provider: SocialProvider): string {
    return `${this.baseUrl}/${this.providerLink(provider, 'login')}`;
  }

  async getAuth(provider: SocialProvider): Promise<AuthToken> {
    return this.client
      .get(this.providerLink(provider, 'auth'))
      .then((res) => res.data);
  }

  private bearerHeader(token: string): AxiosRequestHeaders {
    return { Authorization: `Bearer ${token}` };
  }

  async getUser({ provider, token }: ProviderRequest): Promise<User> {
    return this.client
      .get(this.providerLink(provider, 'user'), {
        headers: this.bearerHeader(token),
      })
      .then((res) => res.data);
  }
}
