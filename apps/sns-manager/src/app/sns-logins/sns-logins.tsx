import { ApiClient } from '@kumi-arts/api-client';
import { SocialProvider } from '@kumi-arts/core';
import SnsLoginButton from './sns-login-button/sns-login-button';
import { Tokens } from '../social-provider-context';
import './sns-logins.module.scss';

/* eslint-disable-next-line */
export interface SnsLoginsProps {
  api: ApiClient;
  updateToken: (t: Tokens) => void;
}

export function SnsLogins({ api, updateToken }: SnsLoginsProps) {
  return (
    <div>
      <SnsLoginButton
        api={api}
        provider={SocialProvider.TWITTER}
        setToken={(t) => updateToken({ [SocialProvider.TWITTER]: t })}
      />

      <SnsLoginButton
        api={api}
        provider={SocialProvider.PINTEREST}
        setToken={(t) => updateToken({ [SocialProvider.PINTEREST]: t })}
      />
    </div>
  );
}

export default SnsLogins;
