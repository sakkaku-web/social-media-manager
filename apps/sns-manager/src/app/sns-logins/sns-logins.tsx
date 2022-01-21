import { ApiClient } from '@kumi-arts/api-client';
import { SocialProvider } from '@kumi-arts/core';
import SnsLoginButton from '../sns-login-button/sns-login-button';
import { Tokens } from '../social-provider-context';
import './sns-logins.module.scss';

/* eslint-disable-next-line */
export interface SnsLoginsProps {
  api: ApiClient;
  updateToken: (t: Tokens) => void;
}

export function SnsLogins({ api, updateToken }: SnsLoginsProps) {
  const loginButtons = Object.values(SocialProvider).map((p) => (
    <SnsLoginButton
      key={p}
      api={api}
      provider={p}
      setToken={(t) => updateToken({ [p]: t })}
    />
  ));

  return <div>{loginButtons}</div>;
}

export default SnsLogins;
