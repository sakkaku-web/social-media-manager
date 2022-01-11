import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { TwitterController } from './twitter/twitter.controller';
import { RedditController } from './reddit/reddit.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [TwitterController, RedditController],
  providers: [],
})
export class AppModule {}
