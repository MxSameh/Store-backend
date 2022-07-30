import {User, UsersTable} from '../models/user'

const usersTable = new UsersTable();

describe('Users table: ', () => {
  it('has an index function', () => {
    expect(usersTable.index).toBeDefined();
  });

  it('has an show function', () => {
    expect(usersTable.show).toBeDefined();
  });

  it('has an create function', () => {
    expect(usersTable.create).toBeDefined();
  });

  it('index should return an array', async() => {
    const result = await usersTable.index();
    expect(result).toEqual([]);
  })

  it('create method add a user', async() => {
    const user : User = {
      firstname: 'mohamed',
      lastname: 'sameh',
      password: 'pass123'
    }
    const result = await usersTable.create(user);

    expect(result.id).toEqual(1);
    expect(result.firstname).toEqual('mohamed');
    expect(result.lastname).toEqual('sameh');

  })

  it('index method returns a list of users', async() => {
    const result = await usersTable.index();

    expect(result.length).toEqual(1) 
  })

  it('show method returns a specific user', async() => {
    const result = await usersTable.show("1") as User;
    expect(result.id).toEqual(1);
    expect(result.firstname).toEqual('mohamed');
    expect(result.lastname).toEqual('sameh');
  })

  it('authenticate method should return the user',async () => {
    const result = await usersTable.authenticate('1','pass123')
    
  })
  
  it('delete method should delete a user',async () => {
    const result = await usersTable.delete('1') as User;
    expect(result.id).toEqual(1);
    expect(result.firstname).toEqual('mohamed');
  })


})