import { SNSPost, SocialProvider } from '@kumi-arts/core';
import { Button, Link, Pane, Text } from 'evergreen-ui';
import { useRef, useState } from 'react';
import PinterestForm from './forms/pinterest-form';
import PostForm from './post-form/post-form';
import ProviderSelect from './post-form/provider-select/provider-select';
import SnsLogins from './sns-logins/sns-logins';
import {
  ProviderBool,
  ProviderStatus,
  SocialProviderContext,
  Status,
} from './social-provider-context';
import { ProviderForm } from './forms/form';
import TwitterForm from './forms/twitter-form';
import RedditForm from './forms/reddit-form';
import CookieConsent from 'react-cookie-consent';
import useDocumentTitle from './document-title';
import FacebookForm from './forms/facebook-form';

export function App() {
  useDocumentTitle('Social Media Manager');

  const [loggedIn, setLoggedIn] = useState({} as ProviderBool);
  const [status, setStatus] = useState({} as ProviderStatus);

  const [defaultPost, setDefaultPost] = useState({
    text: '',
    title: '',
    media: {
      filename: '',
    },
  } as SNSPost);
  const [providers, setProviders] = useState([] as SocialProvider[]);

  const pinterestRef = useRef(null as ProviderForm | null);
  const twitterRef = useRef(null as ProviderForm | null);
  const redditRef = useRef(null as ProviderForm | null);
  const facebookRef = useRef(null as ProviderForm | null);

  const isSubmitting = Object.values(status).some(
    (s) => s === Status.SUBMITTING
  );
  const hasErrors = Object.values(status).some((s) => s === Status.ERROR);

  const onSubmit = () => {
    if (!hasErrors) {
      pinterestRef.current?.submit();
      twitterRef.current?.submit();
      redditRef.current?.submit();
      facebookRef.current?.submit();
    }
  };

  const onProviderChange = (providers: SocialProvider[]) => {
    setProviders(providers);

    Object.keys(status)
      .map((p) => p as SocialProvider)
      .filter((p) => !providers.includes(p))
      .forEach((p) => (status[p] = Status.VALID));
    setStatus(status);
  };

  return (
    <Pane display="flex" flexDirection="column" height="100%">
      <Pane>
        <SocialProviderContext.Provider
          value={{
            loggedIn,
            status,
            setLoggedIn: (p, v) => setLoggedIn((s) => ({ ...s, [p]: v })),
            setStatus: (p, v) => setStatus((s) => ({ ...s, [p]: v })),
          }}
        >
          <SnsLogins />

          <div className="p-4 md:p-8">
            <div className="w-100 md:w-1/2 xl:w-1/3">
              <PostForm
                post={defaultPost}
                onPostChange={setDefaultPost}
                disabled={isSubmitting}
              />
            </div>
            <ProviderSelect selected={providers} onChange={onProviderChange} />

            <div className="w-100 flex flex-col gap-x-4 md:flex-row">
              {providers.includes(SocialProvider.TWITTER) && (
                <TwitterForm
                  defaultPost={defaultPost}
                  ref={twitterRef}
                  disabled={isSubmitting}
                />
              )}

              {providers.includes(SocialProvider.PINTEREST) && (
                <PinterestForm
                  defaultPost={defaultPost}
                  ref={pinterestRef}
                  disabled={isSubmitting}
                />
              )}

              {providers.includes(SocialProvider.REDDIT) && (
                <RedditForm
                  defaultPost={defaultPost}
                  ref={redditRef}
                  disabled={isSubmitting}
                />
              )}

              {(providers.includes(SocialProvider.INSTAGRAM) ||
                providers.includes(SocialProvider.FACEBOOK)) &&
                `Instagram will probably never be supported. Go complain to facebook for making it soo difficult. They just want our data for everything`}
            </div>

            <Button
              onClick={onSubmit}
              appearance="primary"
              disabled={hasErrors || isSubmitting}
            >
              Submit
            </Button>
          </div>
        </SocialProviderContext.Provider>
      </Pane>

      <Pane display="flex" flexGrow="1" alignItems="end">
        <Pane
          className="px-4 md:px-8"
          background="tint2"
          borderTop
          flexGrow="1"
          display="flex"
          justifyContent="space-between"
        >
          <Pane>
            {/* <Link
              size={300}
              padding="0"
              href="https://github.com/sakkaku-web/social-media-manager"
            >
              <FontAwesomeIcon icon={faGithub} />
            </Link> */}
          </Pane>
          <Pane>
            <Link size={300} href="/privacy-policy">
              Privacy Policy
            </Link>
          </Pane>
          <Pane>
            <Link size={300} href="/cookie-policy">
              Cookie Policy
            </Link>
          </Pane>
        </Pane>
      </Pane>

      <Text>
        <CookieConsent>
          <Text color="white">
            This website uses cookies to enhance the user experience. More info
            in the{' '}
          </Text>
          <Link padding="0" href="/cookie-policy">
            cookie policy
          </Link>
        </CookieConsent>
      </Text>
    </Pane>
  );
}

export default App;
