import { ProxyMiddleware } from './proxy-middleware';

export class InstagramMiddleware extends ProxyMiddleware {
  private proxy = this.createProxy('https://graph.instagram.com');

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
