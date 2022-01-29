import { SNSPost, SocialProvider } from '@kumi-arts/core';
import { Button, Link, Pane } from 'evergreen-ui';
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
import CookieConsent from 'react-cookie-consent';

export function App() {
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

  const isSubmitting = Object.values(status).some(
    (s) => s === Status.SUBMITTING
  );
  const hasErrors = Object.values(status).some((s) => s === Status.ERROR);

  const onSubmit = () => {
    if (!hasErrors) {
      pinterestRef.current?.submit();
      twitterRef.current?.submit();
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
          </div>

          <Button
            onClick={onSubmit}
            appearance="primary"
            disabled={hasErrors || isSubmitting}
          >
            Submit
          </Button>
        </div>

        <CookieConsent>
          This website uses cookies to enhance the user experience. More info{' '}
          <Link padding="0" href="/policy">
            here
          </Link>
        </CookieConsent>
      </SocialProviderContext.Provider>
    </Pane>
  );
}

export default App;
