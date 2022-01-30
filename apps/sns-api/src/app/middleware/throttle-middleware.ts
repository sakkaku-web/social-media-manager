import { SocialProvider } from '@kumi-arts/core';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { createHmac } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { subMinutes, isAfter } from 'date-fns';

interface UserRequest {
  timestamp: Date;
  method: string;
}

@Injectable()
export class ThrottleMiddleware implements NestMiddleware {
  private static requestLimits = {
    [SocialProvider.TWITTER]: { POST: 5, GET: 20 },
    [SocialProvider.PINTEREST]: { POST: 5, GET: 20 },
  };

  private static requestsPerUser: { [k: string]: UserRequest[] } = {};

  constructor(private auth: AuthService, private config: ConfigService) {}

  private getRequestsForUser(hash: string): UserRequest[] {
    return ThrottleMiddleware.requestsPerUser[hash] || [];
  }

  use(req: Request, res: Response, next: () => void) {
    const provider = Object.values(SocialProvider).find((p) =>
      req.baseUrl.includes(`/${p}`)
    );
    if (provider != null) {
      const sha256Hasher = createHmac('sha256', this.config.get('HASH_SECRET'));
      const tokenHash = sha256Hasher
        .update(this.auth.getToken(provider))
        .digest('hex');

      const timeLimit = subMinutes(new Date(), 1);
      const allRequests = this.getRequestsForUser(tokenHash);
      const requestStillWithinLimit = allRequests.filter((r) =>
        isAfter(r.timestamp, timeLimit)
      );

      const requestLimit = ThrottleMiddleware.requestLimits[provider] || {};
      const method = req.method;
      const methodLimit = requestLimit[method] || 5;

      if (requestStillWithinLimit.length > methodLimit) {
        this.log(`throttling request ${method} for ${tokenHash}`);
        throw new HttpException(
          'Too many requests per minute for this user',
          429
        );
      }

      requestStillWithinLimit.push({ timestamp: new Date(), method });
      ThrottleMiddleware.requestsPerUser[tokenHash] = requestStillWithinLimit;
    }

    next();
  }

  private log(msg: string) {
    console.log(`${new Date().toISOString()} - [ThrottleMiddleware]: ${msg}`);
  }
}
