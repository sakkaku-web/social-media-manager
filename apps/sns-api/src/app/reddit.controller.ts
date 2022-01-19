import { Controller, Get, Query, Res, Session } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { environment } from '../environments/environment';
import { SocialProvider, User } from '@kumi-arts/core';
import Snoowrap = require('snoowrap');
import { AuthService } from './auth.service';
import { RedditAuthService } from '@kumi-arts/sns-auth';

interface RedditAuthCallback {
  error?: string;
  code: string;
  state: string;
}

@Controller('reddit')
export class RedditController {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly auth: AuthService
  ) {}

  private get redirectUrl() {
    return `${environment.baseUrl}/reddit/callback`;
  }

  private get clientId() {
    return this.config.get('REDDIT_CLIENT');
  }

  private get clientSecret() {
    return this.config.get('REDDIT_SECRET');
  }

  private get redditAuth() {
    return new RedditAuthService({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });
  }

  @Get('login')
  async login(
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const { state, url } = this.redditAuth.getLoginUrl(this.redirectUrl);
    session.REDDIT_STATE = state;
    return res.redirect(url);
  }

  @Get('callback')
  async callback(
    @Query() query: RedditAuthCallback,
    @Session() session: Record<string, string>,
    @Res({ passthrough: true }) res: Response
  ) {
    const state = session.REDDIT_STATE;

    const { token } = await this.redditAuth.handleCallback({
      ...query,
      redirect: this.redirectUrl,
      originalState: state,
    });

    this.auth.saveToken(res, SocialProvider.REDDIT, token);
    return res.redirect(environment.homepage);
  }

  @Get('user')
  async user(): Promise<User> {
    const service = new Snoowrap({
      userAgent: 'kumi-arts:0.0.0 (by /u/illu11)',
      accessToken: this.auth.getToken(SocialProvider.REDDIT),
    });

    const name = await service.getMe().name;

    return { id: name, name };
  }
}
