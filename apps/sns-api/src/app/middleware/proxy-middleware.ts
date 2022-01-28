import { NestMiddleware } from '@nestjs/common';
import {
  createProxyMiddleware,
  Options,
  RequestHandler,
} from 'http-proxy-middleware';

export class ProxyMiddleware implements NestMiddleware {
  private proxy: RequestHandler;

  constructor(target: string, options: Options = {}) {
    this.proxy = this.createProxy(target, options);
  }

  private createProxy(target: string, options: Options) {
    return createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        const end = path.indexOf('/', '/api/'.length);
        return path.substr(end);
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(
          `[ProxyMiddleware]: ${req.originalUrl} -> ${req.url} - ${req.method}`
        );
      },
      ...options,
    });
  }

  use(req: any, res: any, next: () => void) {
    this.proxy(req, res, next);
  }
}
