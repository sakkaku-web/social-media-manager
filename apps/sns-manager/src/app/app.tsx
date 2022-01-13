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
          <TwitterPanel></TwitterPanel>
        </SocialProviderContext.Provider>

        <SocialProviderContext.Provider value={redditProvider}>
          <SnsButton saveToken={setRedditToken}></SnsButton>
          <RedditPanel></RedditPanel>
        </SocialProviderContext.Provider>
      </div>
    </div>
  );
}

export default App;
