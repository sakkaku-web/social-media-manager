import './sns-login-button.module.scss';
import {
  faFacebook,
  faInstagram,
  faReddit,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { SocialProvider, User } from '@kumi-arts/core';
import { environment } from '../../../environments/environment';
import { Button } from 'evergreen-ui';
import { Client } from '../../clients/client';

export interface SnsButtonProps {
  provider: SocialProvider;
  api: Client;
  icon: IconDefinition;
  profileUrl: (u: User) => string;
}

// TODO: move to props
const data = {
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
  [SocialProvider.IMGUR]: {
    icon: faImages,
    profileUrl: ({ name }: User) => `https://imgur.com/user/${name}/posts`,
  },
};

export function SnsLoginButton({
  api,
  provider,
  icon,
  profileUrl,
}: SnsButtonProps) {
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    api
      .getUser()
      .then((user) => setUser(user))
      .catch((err) => {
        setUser(null);
      });
  }, []);

  const buildUrl = () => {
    if (user?.id) {
      return profileUrl(user);
    } else {
      return `${environment.api}/auth/${provider}/login`;
    }
  };

  const redirectLogin = () => {
    window.location.href = buildUrl();
  };

  const text = user?.name ? user.name : `${provider} login`;
  return (
    <Button
      onClick={redirectLogin}
      iconBefore={<FontAwesomeIcon icon={icon} />}
    >
      {text}
    </Button>
  );
}

export default SnsLoginButton;
