import { SocialProvider } from '@kumi-arts/auth-client';
import SnsButton from './sns-button/sns-button';

export function App() {
  return (
    <div>
      <SnsButton provider={SocialProvider.TWITTER}></SnsButton>
      <SnsButton provider={SocialProvider.REDDIT}></SnsButton>
    </div>
  );
}

export default App;
