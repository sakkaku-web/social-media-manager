import {
  Controller,
  Get,
  HttpException,
  Query,
  Res,
  Session,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { environment } from '../environments/environment';
import { nanoid } from 'nanoid';
import { map } from 'rxjs';
import { SocialProvider, User } from '@kumi-arts/core';
import Snoowrap = require('snoowrap');
import { AuthService } from './auth.service';

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

  @Get('login')
  async login(
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const clientId = this.clientId;
    const callback = this.redirectUrl;
    const state = nanoid();
    const url = `https://www.reddit.com/api/v1/authorize?client_id=${clientId}&response_type=code&state=${state}&redirect_uri=${callback}&duration=temporary&scope=identity+submit`;

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

    if (!state) {
      throw new HttpException(
        'Missing state. Call /api/reddit/login first',
        400
      );
    }

    if (state != query.state) {
      throw new HttpException('State mismatch', 400);
    }

    if (query.error) {
      throw new HttpException(query.error, 400);
    }

    const body = `grant_type=authorization_code&code=${query.code}&redirect_uri=${this.redirectUrl}`;
    const encoded = btoa(`${this.clientId}:${this.clientSecret}`);

    return this.httpService
      .post('https://www.reddit.com/api/v1/access_token', body, {
        headers: {
          Authorization: `Basic ${encoded}`,
        },
      })
      .pipe(
        map((data) => {
          if (data.status !== 200) {
            throw new HttpException(`${data.status} - ${data.data}`, 400);
          }

          this.auth.saveToken(
            res,
            SocialProvider.REDDIT,
            data.data.access_token
          );
          return res.redirect(environment.homepage);
        })
      );
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
