import { SNSPost, SocialProvider } from '@kumi-arts/core';
import { Button, Pane } from 'evergreen-ui';
import { useRef, useState } from 'react';
import PinterestForm from './forms/pinterest-form';
import PostForm from './post-form/post-form';
import ProviderSelect from './post-form/provider-select/provider-select';
import SnsLogins from './sns-logins/sns-logins';
import {
  ProviderStatus,
  SocialProviderContext,
} from './social-provider-context';
import { ProviderForm } from './forms/form';

export function App() {
  const [loggedIn, setLoggedIn] = useState({} as ProviderStatus);
  const [errors, setErrors] = useState({} as ProviderStatus);

  const [defaultPost, setDefaultPost] = useState({} as SNSPost);
  const [providers, setProviders] = useState([] as SocialProvider[]);

  const pinterestRef = useRef({} as ProviderForm);

  const onSubmit = () => {
    if (Object.values(errors).every((err) => !err)) {
      pinterestRef.current?.submit();
    }
  };

  const hasErrors = Object.values(errors).some((e) => e);

  return (
    <Pane>
      <SocialProviderContext.Provider
        value={{
          loggedIn,
          errors,
          setLoggedIn: (p, v) => setLoggedIn((s) => ({ ...s, [p]: v })),
          setError: (p, v) => setErrors((s) => ({ ...s, [p]: v })),
        }}
      >
        <SnsLogins />

        <Pane padding="1em">
          <PostForm post={defaultPost} onPostChange={setDefaultPost} />
          <ProviderSelect selected={providers} onChange={setProviders} />

          {providers.includes(SocialProvider.PINTEREST) && (
            <PinterestForm defaultPost={defaultPost} ref={pinterestRef} />
          )}

          <Button onClick={onSubmit} appearance="primary" disabled={hasErrors}>
            Submit
          </Button>
        </Pane>
      </SocialProviderContext.Provider>
    </Pane>
  );
}

export default App;
