import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { SocialProvider } from '@kumi-arts/core';
import { FilesInterceptor } from '@nestjs/platform-express';
import {} from 'multer';
import { ImgurClient } from '@kumi-arts/sns-client';
import { AuthService } from './auth.service';

@Controller(SocialProvider.IMGUR)
export class ImgurController {
  constructor(private readonly auth: AuthService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images'))
  async upload(@UploadedFiles() images: Express.Multer.File[]) {
    const client = new ImgurClient(this.auth.getToken(SocialProvider.IMGUR));
    return Promise.all(
      images.map((i) => client.uploadImage(i.buffer, i.originalname))
    );
  }
}
