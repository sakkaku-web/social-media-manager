import { Pane } from 'evergreen-ui';
import PostForm from './post-form/post-form';
import SnsLogins from './sns-logins/sns-logins';

export function App() {
  return (
    <Pane>
      <SnsLogins />

      <Pane padding="1em">
        <PostForm />
      </Pane>
    </Pane>
  );
}

export default App;
