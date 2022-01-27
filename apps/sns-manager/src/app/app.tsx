import { Pane } from 'evergreen-ui';
import { useState } from 'react';
import PostForm from './post-form/post-form';
import SnsLogins from './sns-logins/sns-logins';
import { LoggedIn, SocialProviderContext } from './social-provider-context';

export function App() {
  const [loggedIn, setLoggedIn] = useState({} as LoggedIn);

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
          <PostForm />
        </Pane>
      </SocialProviderContext.Provider>
    </Pane>
  );
}

export default App;
