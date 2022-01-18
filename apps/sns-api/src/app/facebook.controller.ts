import {
  Controller,
  Get,
  Res,
  Session,
  Query,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { SocialProvider, User } from '@kumi-arts/core';

interface FacebookAuthCallback {
  state: string;
  error: string;
  code: string;
}

@Controller('facebook')
export class FacebookController {
  constructor(
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly http: HttpService
  ) {}

  private get clientId(): string {
    return this.config.get('FACEBOOK_CLIENT');
  }

  private get clientSecret(): string {
    return this.config.get('FACEBOOK_SECRET');
  }

  private get redirectUrl() {
    return `${environment.baseUrl}/facebook/callback`;
  }

  private get graphQlUrl() {
    return 'https://graph.facebook.com/v12.0';
  }

  @Get('login')
  async login(
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const state = nanoid();
    const url = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&state=${state}`;

    session.FACEBOOK_STATE = state;
    return res.redirect(url);
  }

  @Get('callback')
  async callback(
    @Query() query: FacebookAuthCallback,
    @Session() session: Record<string, string>,
    @Res({ passthrough: true }) res: Response
  ) {
    const state = session.FACEBOOK_STATE;

    if (!state) {
      throw new HttpException(
        'Missing state. Call /api/facebook/login first',
        400
      );
    }

    if (state != query.state) {
      throw new HttpException('State mismatch', 400);
    }

    if (query.error) {
      throw new HttpException(query.error, 400);
    }

    const params = `client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&client_secret=${this.clientSecret}&code=${query.code}`;
    return this.http
      .get(`${this.graphQlUrl}/oauth/access_token?${params}`)
      .pipe(
        map((data) => {
          if (data.status !== 200) {
            throw new HttpException(`${data.status} - ${data.data}`, 400);
          }

          this.auth.saveToken(
            res,
            SocialProvider.FACEBOOK,
            data.data.access_token
          );

          return res.redirect(environment.homepage);
        })
      );
  }

  private get token() {
    return this.auth.getToken(SocialProvider.FACEBOOK);
  }

  @Get('user')
  user(): Observable<User> {
    return this.http
      .get(`${this.graphQlUrl}/me`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        map((res) => {
          const data = res.data;
          return {
            id: data.id,
            name: data.name,
          };
        })
      );
  }
}
