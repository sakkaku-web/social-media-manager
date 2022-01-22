import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ImgurController } from './imgur.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, environment.staticFiles),
    }),
  ],
  controllers: [ImgurController, AuthController],
  providers: [AuthService],
})
export class AppModule {}
