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
## Database Schema
```
- users
CREATE TABLE users (
id SERIAL PRIMARY KEY,
firstname VARCHAR(100),
lastname VARCHAR(100),
password TEXT 
);

- products
CREATE TABLE products(
 id SERIAL PRIMARY KEY,
 name VARCHAR,
 price INTEGER,
 category VARCHAR(150)
);

- orders
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR(64),
  user_id bigint REFERENCES users(id) ON DELETE CASCADE
);
```

## Data Models
```
User
- id: number
- firstname: string
- lastname: string
- password: string

Product
- id: number
- name: string
- price: number
- category: string

Order
- id: number
- status: string
- user_id: number
```
