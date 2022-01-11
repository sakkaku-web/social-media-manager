import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly config: ConfigService) {}

  @Get()
  async getData() {
    const userClient = new TwitterApi({
      appKey: this.config.get('TWITTER_API_KEY'),
      appSecret: this.config.get('TWITTER_SECRET'),
      accessToken: this.config.get('TWITTER_CLIENT_ID'),
      accessSecret: this.config.get('TWITTER_CLIENT_SECRET'),
    });
    await userClient.appLogin();
    const user = await userClient.currentUserV2();
    console.log(user);
    return this.appService.getData();
  }
}
