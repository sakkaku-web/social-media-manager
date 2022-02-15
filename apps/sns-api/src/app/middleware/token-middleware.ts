import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { SocialProvider } from '@kumi-arts/core';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private auth: AuthService) { }

  use(req: Request, res: Response, next: () => void) {
    const provider = Object.values(SocialProvider).find((p) =>
      req.baseUrl.includes(`/${p}`)
    );

    if (provider != null) {
      req.headers.authorization = `Bearer ${this.auth.getToken(provider)}`;
      console.log(`[TokenMiddleware]: set authorization token for ${provider}`);
    }
    next();
  }
}
