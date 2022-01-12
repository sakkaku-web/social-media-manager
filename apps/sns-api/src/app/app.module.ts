import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';

import { TwitterController } from './twitter.controller';
import { RedditController } from './reddit.controller';
import { join } from 'path';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, 'sns-manager'),
  })],
  controllers: [TwitterController, RedditController],
  providers: [],
})
export class AppModule {}
