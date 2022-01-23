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

export function clientForRequest(req: Request, auth: AuthService): SNSClient {
  const provider = getProvider(req);
  return getClientForProvider(provider, auth);
}

export function getProvider(req: Request): SocialProvider {
  return Object.values(SocialProvider).find((p) => req.url.includes(`/${p}/`));
}

export function getClientForProvider(
  provider: SocialProvider,
  auth: AuthService
): SNSClient {
  const token = auth.getToken(provider);

  switch (provider) {
    case SocialProvider.FACEBOOK:
      return new FacebookClient(token);
    case SocialProvider.INSTAGRAM:
      return new InstagramClient(token);
    case SocialProvider.REDDIT:
      return new RedditClient(token);
    case SocialProvider.TWITTER:
      return new TwitterClient(token);
    case SocialProvider.IMGUR:
      return new ImgurClient(token);
  }
}
