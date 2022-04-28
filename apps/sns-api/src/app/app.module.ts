import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenMiddleware } from './middleware/token-middleware';
import { SocialProvider } from '@kumi-arts/core';
import { PinterestMiddleware } from './middleware/pinterest-middleware';
import { TwitterMiddleware } from './middleware/twitter-middleware';
import { ThrottleMiddleware } from './middleware/throttle-middleware';
import { RedditMiddleware } from './middleware/reddit-middleware';
import { FacebookMiddleware } from './middleware/facebook-middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, environment.staticFiles),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const providerUrls = Object.values(SocialProvider);
    consumer
      .apply(ThrottleMiddleware)
      .forRoutes(...providerUrls)
      .apply(TokenMiddleware)
      .forRoutes(...providerUrls)
      .apply(PinterestMiddleware)
      .forRoutes(SocialProvider.PINTEREST)
      .apply(TwitterMiddleware)
      .forRoutes(SocialProvider.TWITTER)
      .apply(FacebookMiddleware)
      .forRoutes(SocialProvider.FACEBOOK)
      .apply(RedditMiddleware)
      .forRoutes(SocialProvider.REDDIT);
  }
}
