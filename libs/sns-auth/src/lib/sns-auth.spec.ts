import { snsAuth } from './sns-auth';

describe('snsAuth', () => {
  it('should work', () => {
    expect(snsAuth()).toEqual('sns-auth');
  });
});
