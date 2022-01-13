import { SocialProvider } from '@kumi-arts/core';
import { HttpException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request, Response } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(@Inject(REQUEST) private request: Request) {}

  private tokenKey(provider: SocialProvider) {
    return `${provider}_TOKEN`.toUpperCase();
  }

  saveToken(res: Response, provider: SocialProvider, token: string) {
    res.cookie(this.tokenKey(provider), token, {
      httpOnly: true,
      sameSite: 'strict',
    });
  }

  getToken(provider: SocialProvider) {
    const token = this.request.cookies[this.tokenKey(provider)];
    if (!token) {
      throw new HttpException('Missing token', 401);
    }

    return token;
  }
}
