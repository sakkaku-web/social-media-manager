import { snsClient } from './sns-client';

describe('snsClient', () => {
  it('should work', () => {
    expect(snsClient()).toEqual('sns-client');
  });
});
