import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TwitterController } from './twitter/twitter.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TwitterController],
  providers: [],
})
export class AppModule {}
