import { ApiClient } from '@kumi-arts/api-client';
import { Pane } from 'evergreen-ui';
import { environment } from '../environments/environment';
import PostForm from './post-form/post-form';
import SnsLogins from './sns-logins/sns-logins';

export function App() {
  const api = new ApiClient(environment.api);

  return (
    <Pane>
      <SnsLogins />

      <Pane padding="1em">
        <PostForm api={api} />
      </Pane>
    </Pane>
  );
}

export default App;
