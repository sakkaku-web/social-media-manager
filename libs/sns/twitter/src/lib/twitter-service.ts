import { SocialMediaService } from '@kumi-arts/core';
import { TwitterApi } from 'twitter-api-v2';

export class TwitterService implements SocialMediaService {
  constructor(private client: TwitterApi) {}

  createPost() {}
}
