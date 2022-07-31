import { Application, Request, Response } from "express";
import { UsersTable, User} from "../models/user";
import { createToken } from "../utils/token";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";

// ************************
// USER HANDLERS
// ************************
const usersTable = new UsersTable();

// INDEX
const index = async(req: Request, res: Response) => {

  try{
    const users = await usersTable.index();
    res.json(users);
  }catch(err){
    res.status(404).json(err);
  }
}

// SHOW
const show = async(req: Request, res: Response) => {

  const id = req.params.id;
  try{
    const result = await usersTable.show(id);
    if(result) res.status(200).json(result);
    else res.status(404).json('user not found')
  }catch(err){
    res.status(404).json(err);
  }
}

// CREATE 
const create = async(req: Request, res: Response) => {

  const user : User = {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    password : req.body.password,
  }
  try{
    const newUser = await usersTable.create(user);
    const token = createToken(newUser)
    res.json(token);
  }catch(err){
    res.status(404).json(err);
  }
}

// DELETE
const destroy = async(req: Request, res: Response) : Promise <void> =>  {
  const id = req.params.id;
  try{
    const result = await usersTable.delete(id);
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// AUTHENTICATE
const authenticate = async(req: Request, res: Response) : Promise <void> => {
  const id = req.body.id;
  const password = req.body.password;

  try{
    const result = await usersTable.authenticate(id,password);
    const token = createToken(result)
    res.json(token);
  }catch(err){
    res.status(404).json(err)
  }
}




// *******************************
// USERS ROUTES
// *******************************

export const user_routes = (app: Application) => {
  app.get('/users',verifyAuthToken, index);
  app.get('/users/:id',verifyAuthToken, show);
  app.post('/users', create)
  app.delete('/users/:id',verifyAuthToken,destroy)
  app.post('/users/authenticate',authenticate)
}

