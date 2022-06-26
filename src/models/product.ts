import db from "../database"

export type Product = {
  id?: string;
  name: string;
  price: string;
  category?: string;
}

export class ProductsTable{

  // GET ALL PRODUCTS
  async index(): Promise<Product[]> {
    try{
      const conn = await db.connect();
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      return result.rows // return an array containing all users
    }catch(err){
      console.log(err);
      throw new Error(`unable to get products : ${err}`)
    }
  }

  // GET SINGLE PRODUCT
  async show(id: string): Promise<Product | null> {
    try{
      const conn = await db.connect();
      const sql = 'SELECT * FROM products WHERE id = ($1)'
      const result = await conn.query(sql,[id])
      return result.rows[0] // return user (first element of the array)
    }catch(err){
      console.log(err);
      throw new Error(`unable to get product ${id} : ${err}`)
    }
  }

  // CREATE A NEW PRODUCT
  async create(product: Product): Promise<Product> {
    const {name,price,category} = product;
    try{
      const conn = await db.connect();
      const sql = 'INSERT INTO products (name, price, category) VALUES ($1,$2,$3) RETURNING *'
      const result = await conn.query(sql,[name, price, category])
      return result.rows[0] // return user (first element of the array)
    }catch(err){
      console.log(err);
      throw new Error(`unable to create product : ${err}`)
    }
  }

  // DELETE A PRODUCT
  async delete(id: string): Promise<Product> {
    try{
      const conn = await db.connect();
      const sql = 'DELETE FROM products WHERE id = ($1) RETURNING *';
      const result = await conn.query(sql,[id]);
      return result.rows[0] // return user (first element of the array)
    }catch(err){
      console.log(err);
      throw new Error(`unable to delete product : ${err}`)
    }
  }

}