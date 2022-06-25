import { Application, Request, Response } from "express";
import { Order, OrdersTable } from "../models/order";

const ordersTable = new OrdersTable();

// INDEX
const index = async( req: Request, res:Response ) => {
  try{
    const result = await ordersTable.index();
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// SHOW
const show = async(req: Request, res: Response) => {
  const id = req.body.id
  try{
    const result = await ordersTable.show(id);
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// CREATE
const create = async(req: Request, res: Response) => {
  const order: Order = {
    userId: req.body.userId,
    status:req.body.status
  }
  try{
    const result = await ordersTable.create(order);
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// DESTROY
const destroy = async (req: Request, res: Response) => {
  const id = req.body.id;
  try{
    const result = await ordersTable.delete(id);
    console.log('heyll');
    
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

export const order_routes = (app: Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.delete('/orders/:id', destroy);
}