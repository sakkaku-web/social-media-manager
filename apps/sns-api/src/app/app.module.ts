import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';

import { TwitterController } from './twitter.controller';
import { RedditController } from './reddit.controller';
import { join } from 'path';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { FacebookController } from './facebook.controller';
import { InstagramController } from './instagram.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, environment.staticFiles),
    }),
  ],
  controllers: [
    TwitterController,
    RedditController,
    FacebookController,
    InstagramController,
  ],
  providers: [AuthService],
})
export class AppModule {}
