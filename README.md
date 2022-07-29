# STORE-FRONT BACKEND PROJECT

This is a project from udacity inwhich we build a complete backend with a server and a database and connect them to each other to have a complete backend for a store. 

---
<br>

## SETUP AN .env File
You must create .env file which contains all of the following variables and you should give them value based on you workspace

- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_TEST_DB 
- POSTGRES_USER
- POSTGRES_PASSWORD 
- ENV
- SALT
- PEPER
- TOKEN_SECRET
- PORT

Example:
<br>
PORT = 3000

---
<br>

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