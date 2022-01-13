import { SocialProvider } from '@kumi-arts/core';
import { useState } from 'react';
import PostForm from './post-form/post-form';
import SnsLoginButton from './sns-login-button/sns-login-button';
import { TwitterPanel } from './twitter-panel/twitter-panel';
import {
  SocialProviderContext,
  SocialProviderContextValue,
} from './social-provider-context';
import RedditPanel from './reddit-panel/reddit-panel';
import { ApiClient } from '@kumi-arts/api-client';
import { environment } from '../environments/environment';
import SnsSubmitButton from './sns-submit-button/sns-submit-button';

export function App() {
  const [text, setText] = useState('');

  const twitterProvider: SocialProviderContextValue = {
    provider: SocialProvider.TWITTER,
  };

  const redditProvider: SocialProviderContextValue = {
    provider: SocialProvider.REDDIT,
  };

  const api = new ApiClient(environment.api);
  const postSNS = (provider: SocialProvider) => {
    api.postSNS(provider, { text });
  };

  return (
    <div>
      <div>
        <PostForm text={text} setText={setText}></PostForm>
      </div>

      <div>
        <SocialProviderContext.Provider value={twitterProvider}>
          <SnsLoginButton api={api}></SnsLoginButton>
          <TwitterPanel></TwitterPanel>

          <SnsSubmitButton onSubmit={postSNS}></SnsSubmitButton>
        </SocialProviderContext.Provider>

        <SocialProviderContext.Provider value={redditProvider}>
          <SnsLoginButton api={api}></SnsLoginButton>
          <RedditPanel></RedditPanel>
          <SnsSubmitButton onSubmit={postSNS}></SnsSubmitButton>
        </SocialProviderContext.Provider>
      </div>
    </div>
  );
}

export default App;
