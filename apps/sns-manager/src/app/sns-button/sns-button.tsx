import './sns-button.module.scss';
import { AuthClient, SocialProvider } from '@kumi-arts/auth-client';
import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { environment } from '../../environments/environment';
import { useEffect, useState } from 'react';
import { TwitterService } from '@kumi-arts/sns/twitter';
import { RedditService } from '@kumi-arts/sns/reddit';
import { User } from '@kumi-arts/core';

export interface SnsButtonProps {
  provider: SocialProvider;
}

function providerIcon(provider: SocialProvider) {
  switch (provider) {
    case SocialProvider.REDDIT:
      return faReddit;
    case SocialProvider.TWITTER:
      return faTwitter;
  }
}

function providerService(provider: SocialProvider, token: string) {
  switch (provider) {
    case SocialProvider.REDDIT:
      return new RedditService(token);
    case SocialProvider.TWITTER:
      return new TwitterService(token);
  }
}

export function SnsButton({ provider }: SnsButtonProps) {
  const auth = new AuthClient(environment.authApi);

  const [token, setToken] = useState('');
  const [user, setUser] = useState(null as User | null);

  useEffect(() => {
    auth.getAuth(provider).then((data) => {
      setToken(data.token);
    });
    providerService(provider, token)
      .getUser()
      .then((user) => setUser(user));
  }, []);

  const buildUrl = () => {
    if (token && user?.username) {
      return providerService(provider, token).getProfileLink(user.username);
    } else {
      return auth.getLoginLink(provider);
    }
  };

  return (
    <button>
      <a href={buildUrl()}>
        <FontAwesomeIcon icon={providerIcon(provider)} />
        {user?.username ? user.username : 'Login'}
      </a>
    </button>
  );
}

export default SnsButton;
