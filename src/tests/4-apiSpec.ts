import supertest from 'supertest';
import app from '../server'
import { verifyToken } from '../utils/token';

const request = supertest(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyNSwiZmlyc3RuYW1lIjoiQWhtZWQiLCJsYXN0bmFtZSI6IlNhaWQiLCJwYXNzd29yZCI6IiQyYiQxMCRKQjREMzVYakJXNGE0L04yQnFIUTB1MS5laGs2Ly5IUEpycVZLOWpldmhCcmRHZDRsY3RQMiJ9LCJpYXQiOjE2NTYxODg1ODV9.yT1yez1vI5cjm22MN6VOVHLssvOryAcz63QLLT6ryAk'
const auth = `Bearer ${token}`

describe('User API: ',() : void => {
  it('index should return all users', async () : Promise <void> => {
    const response = await request.get('/users').set("Authorization",auth);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
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

  it('show should return a user', async () => {
    const response = await request.get('/users/2').set("Authorization",auth)

    expect(response.body.firstname).toBe('mohamed')
  })

});

describe('Products Api',():void =>{

  it('index should return all products',async () => {
   const response = await request.get('/products')
   expect(response.status).toBe(200);
   expect(response.body.length).toBe(0)
  })

  it('create should create a new product', async () => {
    const product = {
      name:'cola',
      price:20,
      category:'drinks'
    }
    const response = await request.post('/products').set("Authorization",auth).send(product);

    expect(response.body.name).toBe('cola')
  })

  it('show should return a product',async () => {
    const response = await request.get('/products/2')

    expect(response.body.id).toBe(2)
    
  })

})

describe('Orders Api',():void => {

  it('index should return all orders', async () => {
    const response = await request.get('/orders').set("Authorization",auth);

    expect(response.body.length).toBe(0)
  })

  it('create should create a new order', async () => {
    const order = {
      userId : 2,
      status : 'active'
    }
    const response = await request.post('/orders').set("Authorization",auth).send(order)

    expect(response.body.status).toBe('active')
  })
  
  it('show should return the order',async () => {
    const response = await request.get('/orders/2').set("Authorization",auth)

    expect(response.body.user_id).toBe('2');
  })

  it('delete should delete the order', async () => {
    const response = await request.delete('/orders/1').set("Authorization",auth);

    
    expect(response.body.user_id).toBe('2')
    
  })

})