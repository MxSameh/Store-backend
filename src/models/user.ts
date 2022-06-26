import db from "../database"
import { compare, hash } from "../utils/hash";

export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
}

export class UsersTable{
  // GET ALL USERS
  async index(): Promise<User[]> {
    try{
      const conn = await db.connect();
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      return result.rows // return an array containing all users
    }catch(err){
      console.log(err);
      throw new Error(`unable to get users : ${err}`)
    }
  }

  // GET SINGLE USER
  async show(id: string): Promise<User | null> {
    try{
      const conn = await db.connect();
      const sql = 'SELECT * FROM users WHERE id = ($1)'
      const result = await conn.query(sql,[id])
      return result.rows[0] // return user (first element of the array)
    }catch(err){
      throw new Error(`unable to get user ${id} : ${err}`)
    }
  }

  // CREATE A NEW USER
  async create(user: User): Promise<User> {
    const {firstname,lastname,password} = user;
    const hashedPassword = hash(password);
    try{
      const conn = await db.connect();
      const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1,$2,$3) RETURNING *';
      const result = await conn.query(sql,[firstname, lastname, hashedPassword]);
      return result.rows[0] // return user (first element of the array)
    }catch(err){
      throw new Error(`unable to create user : ${err}`)
    }
  }

  // DELETE A USER
  async delete(id: string): Promise<User> {
    try{
      const conn = await db.connect();
      const sql = 'DELETE FROM users WHERE id = ($1) RETURNING *';
      const result = await conn.query(sql,[id]);
      return result.rows[0] // return user (first element of the array)
    }catch(err){
      throw new Error(`unable to delete user : ${err}`)
    }
  }

  // AUTHENTICATE
  async authenticate (id: string, password: string) : Promise <User | null> {
    const conn = await db.connect();
    const sql = 'SELECT * FROM users WHERE id = ($1)'
    const result = await conn.query(sql, [id]);

    if(result.rows.length){
      const user = result.rows[0];
      const isVerified = compare(password, user.password)
      if(isVerified) 
        return user;
    }

    return null
  }

}