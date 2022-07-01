import { SNSPost, SocialProvider } from '@kumi-arts/core';
import { Alert, Link, Pane, Text } from 'evergreen-ui';
import { useState } from 'react';
import PostForm from './post-form/post-form';
import SnsLogins from './sns-logins/sns-logins';
import {
  ProviderBool,
  ProviderStatus,
  SocialProviderContext,
  Status,
} from './social-provider-context';
import RedditForm from './forms/reddit-form';
import CookieConsent from 'react-cookie-consent';
import useDocumentTitle from './document-title';

export function App() {
  useDocumentTitle('Social Media Manager');

  const [loggedIn, setLoggedIn] = useState({} as ProviderBool);
  const [status, setStatus] = useState({} as ProviderStatus);

  const [defaultPost, setDefaultPost] = useState({
    text: '',
    title: '',
  } as SNSPost);

  const isSubmitting = Object.values(status).some(
    (s) => s === Status.SUBMITTING
  );
  const hasErrors = Object.values(status).some((s) => s === Status.ERROR);

  const isUnsupportedDataManiac =
    loggedIn[SocialProvider.FACEBOOK] || loggedIn[SocialProvider.INSTAGRAM];

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
            {isUnsupportedDataManiac && (
              <Alert intent="warning" title="Unsupported SNS" marginBottom={32}>
                Instagram/Facebook will never be supported. Go complain to
                Facebook for making it so difficult. They just want our data for
                everything.
              </Alert>
            )}

            <div className="w-100 md:w-1/2 xl:w-1/3">
              <PostForm
                post={defaultPost}
                onPostChange={setDefaultPost}
                disabled={isSubmitting}
              />
            </div>

            <div className="w-100 flex flex-col gap-x-4">
              {loggedIn[SocialProvider.REDDIT] && (
                <RedditForm defaultPost={defaultPost} />
              )}
            </div>
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
