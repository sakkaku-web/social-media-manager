import { render } from '@testing-library/react';

import SnsSubmitButton from './sns-submit-button';

describe('SnsSubmitButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SnsSubmitButton />);
    expect(baseElement).toBeTruthy();
  });
});
