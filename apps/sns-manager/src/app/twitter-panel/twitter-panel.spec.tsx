import { render } from '@testing-library/react';

import TwitterPanel from './twitter-panel';

describe('TwitterPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TwitterPanel />);
    expect(baseElement).toBeTruthy();
  });
});
