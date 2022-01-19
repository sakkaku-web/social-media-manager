import {
  Controller,
  Get,
  Query,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { SocialProvider, User } from '@kumi-arts/core';
import { InstagramAuthService } from '@kumi-arts/sns-auth';

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

  private get instagramAuth() {
    return new InstagramAuthService({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });
  }

  private get apiUrl() {
    return `https://api.instagram.com`;
  }

  @Get('login')
  async login(
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const { state, url } = this.instagramAuth.getLoginUrl(this.redirectUrl);
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
    const { token } = await this.instagramAuth.handleCallback({
      ...query,
      redirect: this.redirectUrl,
      originalState: state,
    });

    this.auth.saveToken(res, SocialProvider.INSTAGRAM, token);

    return res.redirect(environment.homepage);
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
