import { ProxyMiddleware } from './proxy-middleware';

export class FacebookMiddleware extends ProxyMiddleware {
  private proxy = this.createProxy('https://graph.facebook.com');

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
