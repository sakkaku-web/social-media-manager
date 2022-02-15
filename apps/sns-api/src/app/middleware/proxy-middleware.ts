import { NestMiddleware } from '@nestjs/common';
import {
  createProxyMiddleware,
  Options,
} from 'http-proxy-middleware';

export abstract class ProxyMiddleware implements NestMiddleware {
  protected createProxy(target: string, options: Options = {}) {
    return createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        const end = path.indexOf('/', '/api/'.length);
        return path.substr(end);
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.removeHeader('cookie');

        console.log(
          `[ProxyMiddleware]: ${req.originalUrl} -> ${req.url} - ${req.method}`
        );
      },
      ...options,
    });
  }

  use(req: any, res: any, next: () => void) {
    throw new Error('Method not implemented.');
  }
}
