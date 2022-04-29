import { SocialProvider } from '@kumi-arts/core';
import SnsLoginButton from './sns-login-button/sns-login-button';
import './sns-logins.module.scss';
import { Pane } from 'evergreen-ui';
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faReddit,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { TwitterClient } from '../clients/twitter';
import { PinterestClient } from '../clients/pinterest';
import { RedditClient } from '../clients/reddit';
import { FacebookClient } from '../clients/facebook';
import { InstagramClient } from '../clients/instagram';

/* eslint-disable-next-line */
export interface SnsLoginsProps {}

export function SnsLogins(props: SnsLoginsProps) {
  return (
    <Pane
      borderBottom
      gap="1em"
      display="flex"
      paddingY="0.5em"
      background="tint2"
      className="px-4 md:px-8"
    >
      <SnsLoginButton
        api={new TwitterClient()}
        provider={SocialProvider.TWITTER}
        icon={faTwitter}
        profileUrl={(u) => `https://twitter.com/${u.id}`}
      />

      <SnsLoginButton
        api={new PinterestClient()}
        provider={SocialProvider.PINTEREST}
        icon={faPinterest}
        profileUrl={(u) => `https://pinterest.com/${u.name}`}
      />

      {/* <SnsLoginButton
        api={new RedditClient()}
        provider={SocialProvider.REDDIT}
        icon={faReddit}
        profileUrl={(u) => `https://reddit.com/u/${u.id}`}
      /> */}

      <SnsLoginButton
        api={new InstagramClient()}
        provider={SocialProvider.INSTAGRAM}
        icon={faInstagram}
        profileUrl={(u) => `https://instagram.com/${u.name}`}
      />

      <SnsLoginButton
        api={new FacebookClient()}
        provider={SocialProvider.FACEBOOK}
        icon={faFacebook}
        profileUrl={(u) => `https://www.facebook.com/profile.php?id=${u.id}`}
      />
    </Pane>
  );
}

export default SnsLogins;
