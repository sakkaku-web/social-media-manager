import { SocialProvider } from '@kumi-arts/core';
import {
  FacebookAuthService,
  ImgurAuthService,
  InstagramAuthService,
  RedditAuthService,
  SNSAuthService,
  TwitterAuthService,
  PinterestAuthService,
} from './auth/';
import {
  Controller,
  Get,
  Query,
  Render,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { environment } from '../environments/environment';
import { getOAuthOptions, getProvider } from './shared';

@Controller(Object.values(SocialProvider).map((p) => `auth/${p}`))
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly auth: AuthService
  ) {}

  private getAuthServiceForProvider(provider: SocialProvider): SNSAuthService {
    const tokens = getOAuthOptions(provider, this.config);

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
      case SocialProvider.PINTEREST:
        return new PinterestAuthService(tokens);
    }
  }

  private getScopesForProvider(provider: SocialProvider): string[] {
    switch (provider) {
      case SocialProvider.TWITTER:
        return ['users.read', 'tweet.write', 'tweet.read'];
    }

    return [];
  }

  private getRedirectUrl(provider: SocialProvider) {
    return `${environment.baseUrl}/auth/${provider}/callback`;
  }

  @Get('login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const provider = getProvider(req);
    const scopes = this.getScopesForProvider(provider);
    const service = this.getAuthServiceForProvider(provider);
    const { state, url } = await service.getLoginUrl(
      this.getRedirectUrl(provider),
      scopes
    );
    res.cookie(`${provider}_STATE`, state, { maxAge: 60 * 1000 });
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
    const provider = getProvider(req);
    try {
      const { token } = await this.getAuthServiceForProvider(
        provider
      ).handleCallback({
        ...query,
        redirect: this.getRedirectUrl(provider),
        originalState: req.cookies[`${provider}_STATE`],
      });

      this.auth.saveToken(res, provider, token);
    } catch (e) {
      console.log('Login failed', e.message);
    }

    res.clearCookie(`${provider}_STATE`);
    return res.redirect(environment.homepage);
  }
}

interface AuthCallback {
  state: string;
  error: string;
  code: string;
}
