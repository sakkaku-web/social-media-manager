import { render } from '@testing-library/react';

import PostForm from './post-form';

describe('PostForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostForm />);
    expect(baseElement).toBeTruthy();
  });
});
