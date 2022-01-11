import {
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
import { environment } from '../../environments/environment';

interface TwitterAuthCallback {
  oauth_token: string;
  oauth_verifier: string;
}

@Controller('twitter')
export class TwitterController {
  constructor(private readonly config: ConfigService) {}

  @Get('user')
  async user(@Req() req: Request) {
    const token: string = req.cookies.TWITTER_TOKEN;
    if (!token) {
      return {
        code: 401,
        message: 'User not logged in',
      };
    }

    const split = token.split(';');
    const client = new TwitterApi({
      appKey: this.config.get('TWITTER_API_KEY'),
      appSecret: this.config.get('TWITTER_SECRET'),
      accessToken: split[0],
      accessSecret: split[1],
    });

    return client.currentUserV2();
  }

  @Get('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>
  ) {
    if (req.cookies.TWITTER_TOKEN) {
      throw new HttpException('Already logged in', 400);
    }

    const client = new TwitterApi({
      appKey: this.config.get('TWITTER_API_KEY'),
      appSecret: this.config.get('TWITTER_SECRET'),
    });

    const authLink = await client.generateAuthLink(
      `${environment.baseUrl}/twitter/callback`
    );

    session.OAUTH_SECRET = authLink.oauth_token_secret;
    return res.redirect(authLink.url);
  }

  @Get('callback')
  async callback(
    @Res({ passthrough: true }) res: Response,
    @Query() query: TwitterAuthCallback,
    @Session() session: Record<string, string>
  ) {
    const secret = session.OAUTH_SECRET;
    if (!query.oauth_token || !query.oauth_verifier || !secret) {
      throw new HttpException('Missing auth data', 400);
    }

    const client = new TwitterApi({
      appKey: this.config.get('TWITTER_API_KEY'),
      appSecret: this.config.get('TWITTER_SECRET'),
      accessToken: query.oauth_token,
      accessSecret: secret,
    });

    const {
      client: loggedClient,
      accessToken,
      accessSecret,
    } = await client.login(query.oauth_verifier);

    res.cookie('TWITTER_TOKEN', `${accessToken};${accessSecret}`);
    console.log(await loggedClient.currentUserV2());
    return res.redirect(environment.homepage);
  }
}
