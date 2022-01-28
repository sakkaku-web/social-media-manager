import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ActionController } from './action.controller';
import { TokenMiddleware } from './middleware/token-middleware';
import { SocialProvider } from '@kumi-arts/core';
import { PinterestMiddleware } from './middleware/pinterest-middleware';
import { TwitterMiddleware } from './middleware/twitter-middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, environment.staticFiles),
    }),
  ],
  controllers: [ActionController, AuthController],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes(...Object.values(SocialProvider))
      .apply(PinterestMiddleware)
      .forRoutes(SocialProvider.PINTEREST)
      .apply(TwitterMiddleware)
      .forRoutes(SocialProvider.TWITTER);
  }
}
