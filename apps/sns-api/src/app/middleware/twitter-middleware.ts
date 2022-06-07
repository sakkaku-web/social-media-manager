import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { ProxyMiddleware } from './proxy-middleware';
import OAuth1Helper from 'twitter-api-v2/dist/client-mixins/oauth1.helper';
import { SocialProvider } from '@kumi-arts/core';
import { Injectable } from '@nestjs/common';
import { OnProxyReqCallback } from 'http-proxy-middleware/dist/types';
import { Request, Response } from 'express';

@Injectable()
export class TwitterMiddleware extends ProxyMiddleware {
  private proxyAuthReq: (url: string) => OnProxyReqCallback = (base) => {
    return (proxyReq, req, res) => {
      const url = `${base}${proxyReq.path}`;

      const token = this.auth.getToken(SocialProvider.TWITTER);
      const [accessToken, accessSecret] = token.split(';');
      const oauth = new OAuth1Helper({
        consumerKeys: {
          key: this.config.get('TWITTER_CLIENT'),
          secret: this.config.get('TWITTER_SECRET'),
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
    };
  };

  private mediaProxy = this.createProxy('https://upload.twitter.com', {
    onProxyReq: this.proxyAuthReq('https://upload.twitter.com'),
  });

  private mainProxy = this.createProxy('https://api.twitter.com', {
    onProxyReq: this.proxyAuthReq('https://api.twitter.com'),
  });

  constructor(private config: ConfigService, private auth: AuthService) {
    super();
  }

  use(req: Request, res: Response, next: () => void) {
    if (req.url.startsWith('/1.1/media/')) {
      this.mediaProxy(req, res, next);
    } else {
      this.mainProxy(req, res, next);
    }
  }
}
