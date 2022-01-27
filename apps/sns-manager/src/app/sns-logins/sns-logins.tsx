import { ApiClient } from '@kumi-arts/api-client';
import { SocialProvider } from '@kumi-arts/core';
import SnsLoginButton from './sns-login-button/sns-login-button';
import { Tokens } from '../social-provider-context';
import './sns-logins.module.scss';
import { Pane } from 'evergreen-ui';
import { faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';

/* eslint-disable-next-line */
export interface SnsLoginsProps {
  api: ApiClient;
  updateToken: (t: Tokens) => void;
}

export function SnsLogins({ api, updateToken }: SnsLoginsProps) {
  return (
    <Pane
      borderBottom
      gap="1em"
      display="flex"
      paddingY="0.5em"
      paddingX="1em"
      background="tint2"
    >
      <SnsLoginButton
        api={api}
        provider={SocialProvider.TWITTER}
        setToken={(t) => updateToken({ [SocialProvider.TWITTER]: t })}
        icon={faTwitter}
        profileUrl={(u) => `https://twitter.com/${u.id}`}
      />

      <SnsLoginButton
        api={api}
        provider={SocialProvider.PINTEREST}
        setToken={(t) => updateToken({ [SocialProvider.PINTEREST]: t })}
        icon={faPinterest}
        profileUrl={(u) => `https://pinterest.at/${u.name}/_saved`}
      />
    </Pane>
  );
}

export default SnsLogins;
