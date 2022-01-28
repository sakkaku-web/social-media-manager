import { SNSPost, SocialProvider } from '@kumi-arts/core';
import { Button, Pane } from 'evergreen-ui';
import { useState } from 'react';
import { PinterestClient, PinterestPost } from './clients/pinterest';
import PinterestForm from './forms/pinterest-form';
import PostForm from './post-form/post-form';
import ProviderSelect from './post-form/provider-select/provider-select';
import SnsLogins from './sns-logins/sns-logins';
import { LoggedIn, SocialProviderContext } from './social-provider-context';

export function App() {
  const [loggedIn, setLoggedIn] = useState({} as LoggedIn);
  const [defaultPost, setDefaultPost] = useState({} as SNSPost);
  const [providers, setProviders] = useState([] as SocialProvider[]);

  const [pinterestPost, setPinterestPost] = useState({} as PinterestPost);
  const pinterestClient = new PinterestClient();
  const showPinterest = providers.includes(SocialProvider.PINTEREST);

  const onSubmit = async () => {
    if (showPinterest) {
      await pinterestClient.postMedia({
        ...defaultPost,
        ...pinterestPost,
      });
    }
  };

  return (
    <Pane>
      <SocialProviderContext.Provider
        value={{
          loggedIn,
          setLoggedIn: (p, v) => setLoggedIn((s) => ({ ...s, [p]: v })),
        }}
      >
        <SnsLogins />

        <Pane padding="1em">
          <PostForm post={defaultPost} onPostChange={setDefaultPost} />
          <ProviderSelect selected={providers} onChange={setProviders} />

          {showPinterest && (
            <PinterestForm
              defaultPost={defaultPost}
              client={pinterestClient}
              onPostChange={setPinterestPost}
            />
          )}

          <Button onClick={onSubmit} appearance="primary">
            Submit
          </Button>
        </Pane>
      </SocialProviderContext.Provider>
    </Pane>
  );
}

export default App;
