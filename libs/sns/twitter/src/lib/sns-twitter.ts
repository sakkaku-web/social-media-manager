import { SocialMediaService } from '@kumi-arts/core';

export class TwitterService implements SocialMediaService {
  constructor(private bearer: string) {}

  createPost() {}
}
