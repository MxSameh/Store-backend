import {User, UsersTable} from '../models/user'

const usersTable = new UsersTable();

describe('users table', () => {
  it('has an index function', () => {
    expect(usersTable.index).toBeDefined();
  });

  it('index should return an array', async() => {
    const result = await usersTable.index();
    expect(result).toEqual([]);
  })

})