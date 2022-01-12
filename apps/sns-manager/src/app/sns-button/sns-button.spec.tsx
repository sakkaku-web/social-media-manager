import { render } from '@testing-library/react';

import SnsButton from './sns-button';

describe('SnsButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SnsButton />);
    expect(baseElement).toBeTruthy();
  });
});
