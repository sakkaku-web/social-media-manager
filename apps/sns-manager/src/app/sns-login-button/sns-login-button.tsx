import './sns-login-button.module.scss';
import { ApiClient } from '@kumi-arts/api-client';
import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { environment } from '../../environments/environment';
import { useContext, useEffect, useState } from 'react';
import { SocialProvider, User } from '@kumi-arts/core';
import { SocialProviderContext } from '../social-provider-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SnsButtonProps {}

const data = {
  [SocialProvider.TWITTER]: {
    icon: faTwitter,
    profileUrl: (name: string) => `https://twitter.com/${name}`,
  },
  [SocialProvider.REDDIT]: {
    icon: faReddit,
    profileUrl: (name: string) => `https://reddit.com/u/${name}`,
  },
};

export function SnsLoginButton(props: SnsButtonProps) {
  const { provider } = useContext(SocialProviderContext);

  const api = new ApiClient(environment.authApi);

  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    api
      .getUser(provider)
      .then((user) => setUser(user))
      .catch((err) => setUser(null));
  }, []);

  const buildUrl = () => {
    if (user) {
      return data[provider].profileUrl(user.username);
    } else {
      return api.getLoginLink(provider);
    }
  };

  return (
    <button>
      <a href={buildUrl()} target={user ? '_blank' : ''} rel="noreferrer">
        <FontAwesomeIcon icon={data[provider].icon} />
        {user?.username ? user.username : 'Login'}
      </a>
    </button>
  );
}

export default SnsLoginButton;
