import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config();

const {POSTGRES_HOST, POSTGRES_USER, POSTGRES_TEST_DB, POSTGRES_DB, POSTGRES_PASSWORD,ENV} = process.env;


let db: any;
console.log(ENV);

if(ENV === 'dev'){
  db = new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD
  })
}

if(ENV === 'test'){
  db = new Pool({
    host:POSTGRES_HOST,
    database:POSTGRES_TEST_DB,
    user:POSTGRES_USER,
    password:POSTGRES_PASSWORD
  })
}

export default db;