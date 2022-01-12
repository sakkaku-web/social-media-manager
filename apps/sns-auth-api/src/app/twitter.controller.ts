import {
  All,
  Controller,
  Get,
  HttpException,
  Query,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';
import { Response, Request } from 'express';
import { environment } from '../environments/environment';
import { AuthToken } from '@kumi-arts/api-client';
import { User } from '@kumi-arts/core';

interface TwitterAuthCallback {
  state: string;
  code: string;
}

@Controller('twitter')
export class TwitterController {
  constructor(private readonly config: ConfigService) {}

  private get clientId() {
    return this.config.get('TWITTER_CLIENT_ID');
  }

  private get clientSecret() {
    return this.config.get('TWITTER_CLIENT_SECRET');
  }

  private get redirectUrl() {
    return `${environment.baseUrl}/twitter/callback`;
  }

  @Get('auth')
  async auth(@Session() session: Record<string, string>): Promise<AuthToken> {
    return { token: session.TWITTER_TOKEN };
  }

  @Get('login')
  async login(
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const client = new TwitterApi({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });

    const authLink = await client.generateOAuth2AuthLink(this.redirectUrl, {
      scope: ['tweet.write', 'tweet.read', 'users.read'],
    });

    session.TWITTER_STATE = authLink.state;
    session.TWITTER_CODE_VERIFIER = authLink.codeVerifier;

    return res.redirect(authLink.url);
  }

  @Get('callback')
  async callback(
    @Res() res: Response,
    @Query() query: TwitterAuthCallback,
    @Session() session: Record<string, string>
  ) {
    const state = session.TWITTER_STATE;
    const codeVerifier = session.TWITTER_CODE_VERIFIER;

    if (!codeVerifier || !state || !query.state || !query.code) {
      throw new HttpException('Denied app or session expired', 400);
    }

    if (state != query.state) {
      throw new HttpException('State mismatch', 400);
    }

    const client = new TwitterApi({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });

    const response = await client.loginWithOAuth2({
      code: query.code,
      codeVerifier,
      redirectUri: this.redirectUrl,
    });

    session.TWITTER_TOKEN = response.accessToken;
    return res.redirect(environment.homepage);
  }

  @Get('user')
  async user(@Req() req: Request): Promise<User> {
    const service = new TwitterApi(
      req.headers.authorization.substring('Bearer '.length)
    );
    return service
      .currentUserV2()
      .then((data) => ({ username: data.data.username }));
  }
}
