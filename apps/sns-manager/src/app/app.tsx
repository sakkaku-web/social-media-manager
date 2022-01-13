import { SocialProvider } from '@kumi-arts/core';
import { useState } from 'react';
import PostForm from './post-form/post-form';
import SnsButton from './sns-button/sns-button';
import {
  SocialProviderContext,
  SocialProviderContextValue,
} from './social-provider-context';

export function App() {
  const [twitterToken, setTwitterToken] = useState('');
  const [redditToken, setRedditToken] = useState('');

  const [text, setText] = useState('');

  const twitterProvider: SocialProviderContextValue = {
    provider: SocialProvider.TWITTER,
    token: twitterToken,
  };

  const redditProvider: SocialProviderContextValue = {
    provider: SocialProvider.REDDIT,
    token: redditToken,
  };

  return (
    <div>
      <div>
        <PostForm text={text} setText={setText}></PostForm>
      </div>

      <div>
        <SocialProviderContext.Provider value={twitterProvider}>
          <SnsButton saveToken={setTwitterToken}></SnsButton>
        </SocialProviderContext.Provider>

        <SocialProviderContext.Provider value={redditProvider}>
          <SnsButton saveToken={setRedditToken}></SnsButton>
        </SocialProviderContext.Provider>
      </div>
    </div>
  );
}

export default App;
