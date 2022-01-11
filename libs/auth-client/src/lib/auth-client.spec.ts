import { authClient } from './auth-client';

describe('authClient', () => {
  it('should work', () => {
    expect(authClient()).toEqual('auth-client');
  });
});
