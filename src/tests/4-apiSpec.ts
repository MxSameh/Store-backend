import supertest from 'supertest';
import app from '../server'
import { verifyToken } from '../utils/token';

const request = supertest(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyNSwiZmlyc3RuYW1lIjoiQWhtZWQiLCJsYXN0bmFtZSI6IlNhaWQiLCJwYXNzd29yZCI6IiQyYiQxMCRKQjREMzVYakJXNGE0L04yQnFIUTB1MS5laGs2Ly5IUEpycVZLOWpldmhCcmRHZDRsY3RQMiJ9LCJpYXQiOjE2NTYxODg1ODV9.yT1yez1vI5cjm22MN6VOVHLssvOryAcz63QLLT6ryAk'
const auth = `Bearer ${token}`

describe('User API tests',() : void => {
  it('index should return all users', async () : Promise <void> => {
    const response = await request.get('/users').set("Authorization",auth);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('create should create a new user', async () : Promise <void> => {
    const user = {
      firstname : 'mohamed',
      lastname : 'sameh',
      password : 'pass'
    }
    const response = await request.post('/users').set("Authorization",auth).send(user)
    const isVerified = verifyToken(response.body);
    expect(isVerified).toBeTrue()
  })
});
