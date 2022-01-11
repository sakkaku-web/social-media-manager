import {
  Controller,
  Get,
  HttpException,
  Query,
  Res,
  Session,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';
import { Response } from 'express';
import { environment } from '../environments/environment';

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

  @Get('login')
  async login(@Res() res: Response, @Session() session: Record<string, any>) {
    const client = new TwitterApi({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });

    const authLink = await client.generateOAuth2AuthLink(this.redirectUrl, {
      scope: ['tweet.write'],
    });

    session.TWITTER_STATE = authLink.state;
    session.TWITTER_CODE_VERIFIER = authLink.codeVerifier;

    return res.redirect(authLink.url);
  }

  @Get('callback')
  async callback(
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

    const resposne = await client.loginWithOAuth2({
      code: query.code,
      codeVerifier,
      redirectUri: this.redirectUrl,
    });

    delete resposne['client'];
    return resposne;
  }
}
