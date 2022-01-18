import { SocialProvider } from '@kumi-arts/core';
import React, { useState } from 'react';
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
  const [images, setImages] = useState([] as File[]);

  const twitterProvider: SocialProviderContextValue = {
    provider: SocialProvider.TWITTER,
  };

  const facebookProvider: SocialProviderContextValue = {
    provider: SocialProvider.FACEBOOK,
  };

  const redditProvider: SocialProviderContextValue = {
    provider: SocialProvider.REDDIT,
  };

  const api = new ApiClient(environment.api);
  const postSNS = (provider: SocialProvider) => {
    api.postSNS(provider, { text }, images);
  };

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(event.target.files || []));
  };

  return (
    <div>
      <div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <div>
          <input type="file" multiple onChange={onFileUpload} />
        </div>
      </div>

      <div>
        <SocialProviderContext.Provider value={twitterProvider}>
          <SnsLoginButton api={api}></SnsLoginButton>
          <TwitterPanel></TwitterPanel>

          <SnsSubmitButton onSubmit={postSNS}></SnsSubmitButton>
        </SocialProviderContext.Provider>

        <SocialProviderContext.Provider value={facebookProvider}>
          <SnsLoginButton api={api}></SnsLoginButton>
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
