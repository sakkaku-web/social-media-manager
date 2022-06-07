import { render } from '@testing-library/react';

import SnsLogins from './sns-logins';

describe('SnsLogins', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SnsLogins />);
    expect(baseElement).toBeTruthy();
  });
});
