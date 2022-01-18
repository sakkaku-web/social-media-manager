import './sns-login-button.module.scss';
import { ApiClient } from '@kumi-arts/api-client';
import {
  faFacebook,
  faReddit,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { SocialProvider, User } from '@kumi-arts/core';
import { SocialProviderContext } from '../social-provider-context';

export interface SnsButtonProps {
  api: ApiClient;
}

const data = {
  [SocialProvider.TWITTER]: {
    icon: faTwitter,
    profileUrl: (id: string) => `https://twitter.com/${id}`,
  },
  [SocialProvider.REDDIT]: {
    icon: faReddit,
    profileUrl: (id: string) => `https://reddit.com/u/${id}`,
  },
  [SocialProvider.FACEBOOK]: {
    icon: faFacebook,
    profileUrl: (id: string) => `https://www.facebook.com/profile.php?id=${id}`,
  },
};

export function SnsLoginButton({ api }: SnsButtonProps) {
  const { provider } = useContext(SocialProviderContext);

  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    api
      .getUser(provider)
      .then((user) => setUser(user))
      .catch((err) => setUser(null));
  }, []);

  const buildUrl = () => {
    if (user?.id) {
      return data[provider].profileUrl(user.id);
    } else {
      return api.getLoginLink(provider);
    }
  };

  return (
    <button>
      <a href={buildUrl()} target={user ? '_blank' : ''} rel="noreferrer">
        <FontAwesomeIcon icon={data[provider].icon} />
        {user?.name ? user.name : 'Login'}
      </a>
    </button>
  );
}

export default SnsLoginButton;
