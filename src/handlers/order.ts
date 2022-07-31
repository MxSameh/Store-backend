import { Application, Request, Response } from "express";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { Order, OrdersTable } from "../models/order";


// ************************
// USER HANDLERS
// ************************

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

  const userId = req.params.userId;
  
  try{
    const result = await ordersTable.show(userId);
    if(result)  res.status(200).json(result);
    else  res.status(404).json('no order with that id')
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
    if(result)  res.status(200).json(result);
    else  res.status(404).json('failed to create order')
  }catch(err){
    res.status(404).json(err);
  }
}

// DESTROY
const destroy = async (req: Request, res: Response) => {
  const id = req.params.id;
  try{
    const result = await ordersTable.delete(id);
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// ADD TO PRODUCT
const addProduct = async(req: Request, res: Response): Promise <void> => {
  const orderId = req.params.id;
  const {productId, quantity} = req.body;

  try{
    const result = await ordersTable.addProduct(quantity ,orderId, productId);
    res.json(result);
  }catch(err){
    res.status(400).json(err);
  }
}



// *******************************
// USERS ROUTES
// *******************************

export const order_routes = (app: Application) => {
  app.get('/orders',verifyAuthToken, index);
  app.get('/orders/:userId', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken,create);
  app.delete('/orders/:id', verifyAuthToken,destroy);
  app.post('/orders/:id/products',verifyAuthToken,addProduct)
}