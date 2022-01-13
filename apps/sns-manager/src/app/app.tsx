import { SocialProvider } from '@kumi-arts/core';
import { useState } from 'react';
import PostForm from './post-form/post-form';
import SnsButton from './sns-button/sns-button';
import { TwitterPanel } from './twitter-panel/twitter-panel';
import {
  SocialProviderContext,
  SocialProviderContextValue,
} from './social-provider-context';
import RedditPanel from './reddit-panel/reddit-panel';

export function App() {
  const [text, setText] = useState('');

  const twitterProvider: SocialProviderContextValue = {
    provider: SocialProvider.TWITTER,
  };

  const redditProvider: SocialProviderContextValue = {
    provider: SocialProvider.REDDIT,
  };

  return (
    <div>
      <div>
        <PostForm text={text} setText={setText}></PostForm>
      </div>

      <div>
        <SocialProviderContext.Provider value={twitterProvider}>
          <SnsButton></SnsButton>
          <TwitterPanel></TwitterPanel>
        </SocialProviderContext.Provider>

        <SocialProviderContext.Provider value={redditProvider}>
          <SnsButton></SnsButton>
          <RedditPanel></RedditPanel>
        </SocialProviderContext.Provider>
      </div>
    </div>
  );
}

export default App;
