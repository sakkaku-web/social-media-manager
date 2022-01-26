import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { SNSMedia, SNSPost, SocialProvider, User } from '@kumi-arts/core';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import {} from 'multer';
import { AuthService } from './auth.service';
import { clientForRequest } from './shared';
import { ConfigService } from '@nestjs/config';

@Controller(Object.values(SocialProvider))
export class ActionController {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService
  ) {}

  @Get('user')
  async user(@Req() req: Request): Promise<User> {
    const client = clientForRequest(req, this.auth, this.config);

    return client.getUser().catch((e) => {
      throw new HttpException(`Failed to get user data: ${e.message}`, 401);
    });
  }

  @Post('post')
  @UseInterceptors(FilesInterceptor('images'))
  async post(
    @Req() req: Request,
    @Body() body: SNSPost,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    const client = clientForRequest(req, this.auth, this.config);
    const image: SNSMedia | null =
      images.length > 0
        ? {
            filename: images[0].originalname,
            image: images[0].buffer,
          }
        : null;
    return client.postMedia(body, image);
  }
}
