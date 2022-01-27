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
import { ProxyMiddleware } from './middleware/proxy-middleware';
import { SocialProvider } from '@kumi-arts/core';

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
    const providerUrls = Object.values(SocialProvider) as string[];
    consumer.apply(TokenMiddleware, ProxyMiddleware).forRoutes(...providerUrls);
  }
}
