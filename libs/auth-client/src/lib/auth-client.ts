export interface AuthToken {
  token: string;
}

export enum SocialProvider {
  TWITTER,
  REDDIT,
}

export function login(provider: SocialProvider): string {
  return 'auth-client';
}
