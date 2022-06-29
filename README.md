# STORE-FRONT BACKEND PROJECT

## API EndPoints :

### 1- Users
> 'GET' /users : get all users

> 'GET' /users/:id : get user with the given id

> 'POST'  /users : create a new user

### 2- Products
> 'GET' /products : get all products

> 'GET' /products/:id : get product with the given id

> 'POST'  /products : create a new product
### 3- Order
> 'GET' /orders : get all orders

> 'GET' /orders/:userId : get all user's orders of the given user id

> 'POST'  /order : create a new order

---
## INSTALLION STEPS
1- Create store database
```sql
/*in the terminal run*/
- su postgres
- psql postgres
- CREATE DATABASE store;
- CREATE user OWNER WITH PASSWORD 'password123';
- GRANT all privileges ON DATABASE store To owner;
- CREATE DATABASE store_test;
- GRANT all privileges ON DATABASE store_test To owner;
```
2- Clone the project
```bash
# in the terminal run
git clone https://github.com/MxSameh/Store-backend.git
cd store-backend
```
## To start the server

```bash
npm run start
```

## To run tests 
```bash
npm run test
```