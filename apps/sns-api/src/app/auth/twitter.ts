import { validateCallbackState } from './sns-auth';
import {
  OAuthOptions,
  OAuthLogin,
  OAuthLoginCallback,
  OAuthCallbackResponse,
  SNSAuthService,
} from './sns-auth';
import { TwitterApi } from 'twitter-api-v2';

interface TwitterOAuthCallback extends OAuthLoginCallback {
  oauth_token: string;
  oauth_verifier: string;
}

export class TwitterAuthService implements SNSAuthService {
  constructor(private options: OAuthOptions) {}

  private get client() {
    const { clientId, clientSecret } = this.options;
    return new TwitterApi({
      appKey: clientId,
      appSecret: clientSecret,
    });
  }

  async getLoginUrl(
    redirect: string,
    scope: string[] = []
  ): Promise<OAuthLogin> {
    // const { url, state, codeVerifier } = this.client.generateOAuth2AuthLink(
    //   redirect,
    //   { scope }
    // );
    // return { url, state: `${state};${codeVerifier}` };

    const { url, oauth_token_secret } = await this.client.generateAuthLink(
      redirect
    );

    return { url, state: oauth_token_secret };
  }

  async handleCallback({
    oauth_token,
    oauth_verifier,
    originalState: secret,
  }: TwitterOAuthCallback): Promise<OAuthCallbackResponse> {
    if (!oauth_token || !oauth_verifier || !secret) {
      throw new Error('You denied the app or your session expired');
    }

    const { clientId, clientSecret } = this.options;

    const client = new TwitterApi({
      appKey: clientId,
      appSecret: clientSecret,
      accessToken: oauth_token,
      accessSecret: secret,
    });

    const { accessToken, accessSecret } = await client.login(oauth_verifier);

    // const [originalState, codeVerifier] = callback.originalState.split(';');
    // if (!codeVerifier) {
    //   throw new Error('Missing code verifier');
    // }
    // validateCallbackState({ ...callback, originalState });

    // const { accessToken } = await this.client.loginWithOAuth2({
    //   code: callback.code,
    //   codeVerifier,
    //   redirectUri: callback.redirect,
    // });

    return { token: `${accessToken};${accessSecret}` };
  }
}
