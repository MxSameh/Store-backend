import { Application, Request, Response } from "express";
import { Product, ProductsTable } from "../models/product";

const productsTable = new ProductsTable();

const index = async (req: Request, res: Response) => {
  try{
    const result = await productsTable.index();
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

const show = async (req: Request, res: Response) => {
  const id = req.body.id;
  try{
    const result = await productsTable.show(id)
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

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

const destroy = async (req: Request, res: Response) => {
  const id = req.body.id;
  try{
    const result = await productsTable.delete(id)
    res.json(result);
  }catch(err){
    res.status(404).json(err)
  }
}


export const product_routes = (app: Application) => {
  app.get('/products',index);
  app.get('/products/:id',show);
  app.post('/products',create);
  app.delete('/products/:id',destroy);
}