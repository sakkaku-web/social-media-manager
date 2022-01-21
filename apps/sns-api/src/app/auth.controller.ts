import { SocialProvider } from '@kumi-arts/core';
import {
  FacebookAuthService,
  ImgurAuthService,
  InstagramAuthService,
  OAuthOptions,
  RedditAuthService,
  SNSAuthService,
  TwitterAuthService,
} from '@kumi-arts/sns-auth';
import {
  FacebookClient,
  ImgurClient,
  InstagramClient,
  MediaPost,
  RedditClient,
  SNSClient,
  TwitterClient,
  User,
} from '@kumi-arts/sns-client';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Render,
  Req,
  Res,
  Session,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Request, Response, Express } from 'express';
import { Multer } from 'multer';
import { environment } from '../environments/environment';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller([
  SocialProvider.FACEBOOK,
  SocialProvider.INSTAGRAM,
  SocialProvider.REDDIT,
  SocialProvider.TWITTER,
  SocialProvider.IMGUR,
])
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly auth: AuthService
  ) {}

  private getProvider(req: Request): SocialProvider {
    return Object.values(SocialProvider).find((p) =>
      req.url.includes(`/${p}/`)
    );
  }

  private getOAuthOptions(provider: SocialProvider): OAuthOptions {
    return {
      clientId: this.config.get(`${provider.toUpperCase()}_CLIENT`),
      clientSecret: this.config.get(`${provider.toUpperCase()}_SECRET`),
    };
  }

  private getAuthServiceForProvider(provider: SocialProvider): SNSAuthService {
    const tokens = this.getOAuthOptions(provider);

    switch (provider) {
      case SocialProvider.FACEBOOK:
        return new FacebookAuthService(tokens);
      case SocialProvider.INSTAGRAM:
        return new InstagramAuthService(tokens);
      case SocialProvider.REDDIT:
        return new RedditAuthService(tokens);
      case SocialProvider.TWITTER:
        return new TwitterAuthService(tokens);
      case SocialProvider.IMGUR:
        return new ImgurAuthService(tokens);
    }
  }

  private getClientForProvider(provider: SocialProvider): SNSClient {
    const { clientId } = this.getOAuthOptions(provider);
    const token = this.auth.getToken(provider);

    switch (provider) {
      case SocialProvider.FACEBOOK:
        return new FacebookClient(token);
      case SocialProvider.INSTAGRAM:
        return new InstagramClient(token);
      case SocialProvider.REDDIT:
        return new RedditClient(token);
      case SocialProvider.TWITTER:
        return new TwitterClient(token);
      case SocialProvider.IMGUR:
        return new ImgurClient(token, clientId);
    }
  }

  private getScopesForProvider(provider: SocialProvider): string[] {
    switch (provider) {
      case SocialProvider.TWITTER:
        return ['users.read', 'tweet.write', 'tweet.read'];
    }

    return [];
  }

  private clientForRequest(req: Request): SNSClient {
    const provider = this.getProvider(req);
    return this.getClientForProvider(provider);
  }

  private getRedirectUrl(provider: SocialProvider) {
    return `${environment.baseUrl}/${provider}/callback`;
  }

  @Get('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const provider = this.getProvider(req);
    const scopes = this.getScopesForProvider(provider);
    const { state, url } = this.getAuthServiceForProvider(provider).getLoginUrl(
      this.getRedirectUrl(provider),
      scopes
    );
    session[`${provider}_STATE`] = state;
    return res.redirect(url);
  }

  @Get('hashCallback')
  @Render('hashCallback')
  async hashCallback() {
    return {};
  }

  @Get('callback')
  async callback(
    @Req() req: Request,
    @Query() query: AuthCallback,
    @Session() session: Record<string, string>,
    @Res({ passthrough: true }) res: Response
  ) {
    const provider = this.getProvider(req);
    try {
      const { token } = await this.getAuthServiceForProvider(
        provider
      ).handleCallback({
        ...query,
        redirect: this.getRedirectUrl(provider),
        originalState: session[`${provider}_STATE`],
      });

      this.auth.saveToken(res, provider, token);
      return res.redirect(environment.homepage);
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 400);
    }
  }

  @Get('user')
  async user(@Req() req: Request): Promise<User> {
    const client = this.clientForRequest(req);

    return client.getUser().catch((e) => {
      console.log(e);
      throw new HttpException(`Failed to get user data: ${e.message}`, 401);
    });
  }

  @Post('post')
  @UseInterceptors(FilesInterceptor('images'))
  async post(
    @Req() req: Request,
    @Body() body: MediaPost,
    @UploadedFiles() images: Express.Multer.File[]
  ) {
    const client = this.clientForRequest(req);
    return client.postMedia({
      ...body,
      images: images.map((i) => ({
        data: i.buffer,
        filename: i.originalname,
        type: i.mimetype,
      })),
    });
  }
}

interface AuthCallback {
  state: string;
  error: string;
  code: string;
}
