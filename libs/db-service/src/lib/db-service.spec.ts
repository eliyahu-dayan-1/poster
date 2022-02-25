import { dbService } from './db-service';

describe('dbService', () => {
  it('should work', () => {
    expect(dbService()).toEqual('db-service');
  });
});
