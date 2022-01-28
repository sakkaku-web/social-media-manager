import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { ProxyMiddleware } from './proxy-middleware';
import OAuth1Helper from 'twitter-api-v2/dist/client-mixins/oauth1.helper';
import { SocialProvider } from '@kumi-arts/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitterMiddleware extends ProxyMiddleware {
  constructor(config: ConfigService, auth: AuthService) {
    super('https://api.twitter.com', {
      onProxyReq: (proxyReq, req, res) => {
        const url = `https://api.twitter.com${proxyReq.path}`;

        const token = auth.getToken(SocialProvider.TWITTER);
        const [accessToken, accessSecret] = token.split(';');
        const oauth = new OAuth1Helper({
          consumerKeys: {
            key: config.get('TWITTER_CLIENT'),
            secret: config.get('TWITTER_SECRET'),
          },
        });
        const info = oauth.authorize(
          {
            method: req.method,
            url,
          },
          { key: accessToken, secret: accessSecret }
        );

        proxyReq.setHeader('Authorization', oauth.toHeader(info).Authorization);
      },
    });
  }

  use(req: any, res: any, next: () => void) {
    super.use(req, res, next);
  }
}
