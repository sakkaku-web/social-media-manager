import { Request, Response } from 'express';
import { ProxyMiddleware } from './proxy-middleware';

export class RedditMiddleware extends ProxyMiddleware {
  private proxy = this.createProxy('https://oauth.reddit.com/', {
    headers: {
      'User-Agent': 'web:sns-manager:0.0.1 (by /u/illu11)',
    },
  });

  private mediaProxy = this.createProxy(
    'https://reddit-subreddit-uploaded-media.s3-accelerate.amazonaws.com'
  );

  use(req: Request, res: Response, next: () => void) {
    if (req.url.startsWith('/custom/media')) {
      delete req.headers['authorization'];
      req.headers.host =
        'https://reddit-subreddit-uploaded-media.s3-accelerate.amazonaws.com';
      this.mediaProxy(req, res, next);
    } else {
      this.proxy(req, res, next);
    }
  }
}
