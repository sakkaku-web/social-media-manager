import {
  Controller,
  Get,
  Res,
  Session,
  Query,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { environment } from '../environments/environment';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { SocialProvider, User } from '@kumi-arts/core';
import { FacebookAuthService, SNSAuthService } from '@kumi-arts/sns-auth';

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

  private get facebookAuth(): SNSAuthService {
    return new FacebookAuthService({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });
  }

  private get graphQlUrl() {
    return 'https://graph.facebook.com/v12.0';
  }

  @Get('login')
  async login(
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const { state, url } = this.facebookAuth.getLoginUrl(this.redirectUrl);
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

    try {
      const { token } = await this.facebookAuth.handleCallback({
        ...query,
        redirect: this.redirectUrl,
        originalState: state,
      });

      this.auth.saveToken(res, SocialProvider.FACEBOOK, token);

      return res.redirect(environment.homepage);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
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
