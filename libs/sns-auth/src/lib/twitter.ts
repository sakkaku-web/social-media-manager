import { validateCallbackState } from './sns-auth';
import {
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  OAuthCallbackResponse,
  SNSAuthService,
} from './sns-auth';
import { TwitterApi } from 'twitter-api-v2';

export class TwitterAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  private get client() {
    return new TwitterApi(this.options);
  }

  getLoginUrl(redirect: string, scope: string[] = []): OAuthLogin {
    const { url, state, codeVerifier } = this.client.generateOAuth2AuthLink(
      redirect,
      { scope }
    );
    return { url, state: `${state};${codeVerifier}` };
  }

  async handleCallback(
    callback: OAuthLoginCallback
  ): Promise<OAuthCallbackResponse> {
    const [originalState, codeVerifier] = callback.originalState.split(';');
    if (!codeVerifier) {
      throw new Error('Missing code verifier');
    }
    validateCallbackState({ ...callback, originalState });

    const { accessToken } = await this.client.loginWithOAuth2({
      code: callback.code,
      codeVerifier,
      redirectUri: callback.redirect,
    });

    return { token: accessToken };
  }
}
