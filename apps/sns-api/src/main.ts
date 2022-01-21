/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { join } from 'path';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const httpsOptions: HttpsOptions = environment.https;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('hbs');

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
