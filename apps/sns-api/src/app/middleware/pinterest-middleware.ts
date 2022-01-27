import { ProxyMiddleware } from './proxy-middleware';

export class PinterestMiddleware extends ProxyMiddleware {
  constructor() {
    super('https://api.pinterest.com/v5');
  }
}
