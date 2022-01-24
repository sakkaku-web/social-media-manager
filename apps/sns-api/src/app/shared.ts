import { SocialProvider } from '@kumi-arts/core';
import {
  FacebookClient,
  ImgurClient,
  InstagramClient,
  RedditClient,
  SNSClient,
  TwitterClient,
} from '@kumi-arts/sns-client';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { OAuthOptions } from '@kumi-arts/sns-auth';

export function clientForRequest(
  req: Request,
  auth: AuthService,
  config: ConfigService
): SNSClient {
  const provider = getProvider(req);
  return getClientForProvider(provider, auth, config);
}

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

export function getClientForProvider(
  provider: SocialProvider,
  auth: AuthService,
  config: ConfigService
): SNSClient {
  const token = auth.getToken(provider);
  const options = getOAuthOptions(provider, config);

  switch (provider) {
    case SocialProvider.FACEBOOK:
      return new FacebookClient(token);
    case SocialProvider.INSTAGRAM:
      return new InstagramClient(token);
    case SocialProvider.REDDIT:
      return new RedditClient(token);
    case SocialProvider.TWITTER:
      return new TwitterClient(token, options?.clientId, options.clientSecret);
    case SocialProvider.IMGUR:
      return new ImgurClient(token);
  }
}
