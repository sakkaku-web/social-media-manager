import { render } from '@testing-library/react';

import RedditPanel from './reddit-panel';

describe('RedditPanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RedditPanel />);
    expect(baseElement).toBeTruthy();
  });
});
