import './sns-login-button.module.scss';
import { ApiClient } from '@kumi-arts/api-client';
import {
  faFacebook,
  faInstagram,
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
    profileUrl: ({ id }: User) => `https://twitter.com/${id}`,
  },
  [SocialProvider.REDDIT]: {
    icon: faReddit,
    profileUrl: ({ id }: User) => `https://reddit.com/u/${id}`,
  },
  [SocialProvider.FACEBOOK]: {
    icon: faFacebook,
    profileUrl: ({ id }: User) =>
      `https://www.facebook.com/profile.php?id=${id}`,
  },
  [SocialProvider.INSTAGRAM]: {
    icon: faInstagram,
    profileUrl: ({ name }: User) => `https://instagram.com/${name}`,
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
      return data[provider].profileUrl(user);
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
