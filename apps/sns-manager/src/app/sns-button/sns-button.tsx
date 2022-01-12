import './sns-button.module.scss';
import { ApiClient } from '@kumi-arts/api-client';
import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { environment } from '../../environments/environment';
import { useEffect, useState } from 'react';
import { SocialProvider, User } from '@kumi-arts/core';

export interface SnsButtonProps {
  provider: SocialProvider;
}

const data = {
  [SocialProvider.TWITTER]: {
    icon: faTwitter,
    profileUrl: (name: string) => `https://reddit.com/u/${name}`,
  },
  [SocialProvider.REDDIT]: {
    icon: faReddit,
    profileUrl: (name: string) => `https://twitter.com/${name}`,
  },
};

export function SnsButton({ provider }: SnsButtonProps) {
  const api = new ApiClient(environment.authApi);

  const [token, setToken] = useState('');
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    api.getAuth(provider).then((data) => {
      setToken(data.token);

      console.log(data);
      if (data.token) {
        api.getUser({ provider, token: data.token }).then((user) => {
          console.log(user);
          setUser(user);
        });
      }
    });
  }, []);

  const buildUrl = () => {
    if (token && user?.username) {
      return data[provider].profileUrl(user.username);
    } else {
      return api.getLoginLink(provider);
    }
  };

  return (
    <button>
      <a href={buildUrl()}>
        <FontAwesomeIcon icon={data[provider].icon} />
        {user?.username ? user.username : 'Login'}
      </a>
    </button>
  );
}

export default SnsButton;
