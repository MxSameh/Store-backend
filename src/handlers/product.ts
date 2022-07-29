import { Application, Request, Response } from "express";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { Product, ProductsTable } from "../models/product";

// ************************
// PRODUCTS HANDLERS
// ************************

const productsTable = new ProductsTable();

// INDEX
const index = async (req: Request, res: Response) => {
  try{
    const result = await productsTable.index();
    res.status(200).json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// SHOW
const show = async (req: Request, res: Response) => {
  const id = req.body.id;
  try{
    const result = await productsTable.show(id)
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// CREATE
const create = async (req: Request, res: Response) => {

  const product: Product = {
    name:req.body.name,
    price:req.body.price,
    category:req.body.category
  }
  try{
    const result = await productsTable.create(product)
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// DELETE
const destroy = async (req: Request, res: Response) => {
  const id = req.params.id;
  try{
    const result = await productsTable.delete(id)
    res.json(result);
  }catch(err){
    res.status(404).json(err)
  }
}


// *******************************
// PRODUCTS ROUTES
// *******************************

export const product_routes = (app: Application) => {
  app.get('/products',index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id',verifyAuthToken,destroy);
}