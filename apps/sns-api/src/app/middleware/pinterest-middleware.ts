import { ProxyMiddleware } from './proxy-middleware';

export class PinterestMiddleware extends ProxyMiddleware {
  private proxy = this.createProxy('https://api.pinterest.com/v5');

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
