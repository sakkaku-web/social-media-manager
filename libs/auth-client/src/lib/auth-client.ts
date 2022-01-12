import { Axios } from 'axios';

export interface AuthToken {
  token: string;
}

export enum SocialProvider {
  TWITTER,
  REDDIT,
}

export class AuthClient {
  private client: Axios;

  constructor(private baseUrl: string) {
    this.client = new Axios({
      baseURL: baseUrl,
    });
  }

  private providerUrl(provider: SocialProvider): string {
    return SocialProvider[provider];
  }

  getLoginLink(provider: SocialProvider): string {
    return `${this.baseUrl}/${this.providerUrl(provider)}/login`;
  }

  async getAuth(provider: SocialProvider): Promise<AuthToken> {
    const url = `/${this.providerUrl(provider)}/auth`;

    return this.client.get(url).then((res) => res.data);
  }
}
