import { render } from '@testing-library/react';

import SnsLoginButton from './sns-login-button';

describe('SnsButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SnsLoginButton />);
    expect(baseElement).toBeTruthy();
  });
});
