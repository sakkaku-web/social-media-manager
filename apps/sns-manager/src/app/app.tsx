import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faReddit } from '@fortawesome/free-brands-svg-icons';

export function App() {
  return (
    <div>
      <FontAwesomeIcon icon={faTwitter} />
      <FontAwesomeIcon icon={faReddit} />
    </div>
  );
}

export default App;
