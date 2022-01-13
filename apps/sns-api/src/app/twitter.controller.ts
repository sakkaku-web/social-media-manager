import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Res,
  Session,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';
import { Response } from 'express';
import { environment } from '../environments/environment';
import { SNSPost, SocialProvider, User } from '@kumi-arts/core';
import { AuthService } from './auth.service';

interface TwitterAuthCallback {
  state: string;
  code: string;
}

@Controller('twitter')
export class TwitterController {
  constructor(
    private readonly config: ConfigService,
    private readonly auth: AuthService
  ) {}

  private get redirectUrl() {
    return `${environment.baseUrl}/twitter/callback`;
  }

  private get oauthClient() {
    return new TwitterApi({
      clientId: this.config.get('TWITTER_CLIENT_ID'),
      clientSecret: this.config.get('TWITTER_CLIENT_SECRET'),
    });
  }

  @Get('login')
  async login(
    @Res() res: Response,
    @Session() session: Record<string, string>
  ) {
    const client = this.oauthClient;
    const authLink = client.generateOAuth2AuthLink(this.redirectUrl, {
      scope: ['tweet.write', 'tweet.read', 'users.read'],
    });

    session.TWITTER_STATE = authLink.state;
    session.TWITTER_CODE_VERIFIER = authLink.codeVerifier;

    return res.redirect(authLink.url);
  }

  @Get('callback')
  async callback(
    @Res({ passthrough: true }) res: Response,
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

    const client = this.oauthClient;
    const response = await client.loginWithOAuth2({
      code: query.code,
      codeVerifier,
      redirectUri: this.redirectUrl,
    });

    this.auth.saveToken(res, SocialProvider.TWITTER, response.accessToken);
    return res.redirect(environment.homepage);
  }

  private createService() {
    return new TwitterApi(this.auth.getToken(SocialProvider.TWITTER));
  }

  @Get('user')
  async user(): Promise<User> {
    return this.createService()
      .currentUserV2()
      .then((data) => ({ username: data.data.username }));
  }

  @Post('post')
  async post(@Body() body: SNSPost): Promise<void> {
    await this.createService().v2.tweet({
      text: body.text,
    });
  }
}
