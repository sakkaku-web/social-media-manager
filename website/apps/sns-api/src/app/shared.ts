import { SocialProvider } from '@kumi-arts/core';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { OAuthOptions } from './auth';

export function getProvider(req: Request): SocialProvider {
  return Object.values(SocialProvider).find((p) => req.url.includes(`/${p}/`));
}

export function getOAuthOptions(
  provider: SocialProvider,
  config: ConfigService
): OAuthOptions {
  return {
    clientId: config.get(`${provider.toUpperCase()}_CLIENT`),
    clientSecret: config.get(`${provider.toUpperCase()}_SECRET`),
  };
}
