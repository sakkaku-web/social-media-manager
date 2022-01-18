import {
  Controller,
  Get,
  HttpException,
  Query,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios';
import { environment } from '../environments/environment';
import { nanoid } from 'nanoid';
import { map, Observable } from 'rxjs';
import { SocialProvider, User } from '@kumi-arts/core';

interface InstagramAuthCallback {
  state: string;
  error: string;
  code: string;
}

@Controller('instagram')
export class InstagramController {
  constructor(
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly http: HttpService
  ) {}

  private get clientId(): string {
    return this.config.get('INSTAGRAM_CLIENT');
  }

  private get clientSecret(): string {
    return this.config.get('INSTAGRAM_SECRET');
  }

  private get redirectUrl() {
    return `${environment.baseUrl}/instagram/callback`;
  }

  private get apiUrl() {
    return `https://api.instagram.com`;
  }

  @Get('login')
  async login(
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const state = nanoid();
    const url = `${this.apiUrl}/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&scope=user_profile&response_type=code&state=${state}`;

    session.INSTAGRAM_STATE = state;
    return res.redirect(url);
  }

  private get token() {
    return this.auth.getToken(SocialProvider.INSTAGRAM);
  }

  @Get('callback')
  async callback(
    @Query() query: InstagramAuthCallback,
    @Session() session: Record<string, string>,
    @Res({ passthrough: true }) res: Response
  ) {
    const state = session.INSTAGRAM_STATE;

    if (!state) {
      throw new HttpException(
        'Missing state. Call /api/instagram/login first',
        400
      );
    }

    if (state != query.state) {
      throw new HttpException('State mismatch', 400);
    }

    if (query.error) {
      throw new HttpException(query.error, 400);
    }

    return this.http
      .post(`${this.apiUrl}/oauth/access_token`, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: query.code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUrl,
      })
      .pipe(
        map((data) => {
          if (data.status !== 200) {
            throw new HttpException(`${data.status} - ${data.data}`, 400);
          }

          this.auth.saveToken(
            res,
            SocialProvider.INSTAGRAM,
            data.data.access_token
          );

          return res.redirect(environment.homepage);
        })
      );
  }

  @Get('user')
  user(): Observable<User> {
    return this.http
      .get(`${this.apiUrl}/me?access_token=${this.token}&fields=id,username`)
      .pipe(
        map((res) => {
          const data = res.data;
          return {
            id: data.id,
            name: data.username,
          };
        })
      );
  }
}
