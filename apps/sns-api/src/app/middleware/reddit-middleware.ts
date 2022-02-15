import { ProxyMiddleware } from './proxy-middleware';

export class RedditMiddleware extends ProxyMiddleware {
  private proxy = this.createProxy('https://oauth.reddit.com/', {
    headers: {
        'User-Agent': 'web:sns-manager:0.0.1 (by /u/illu11)',
    },
  });

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
