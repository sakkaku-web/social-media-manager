import { render } from '@testing-library/react';

import ProviderSelect from './provider-select';

describe('ProviderSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProviderSelect />);
    expect(baseElement).toBeTruthy();
  });
});
