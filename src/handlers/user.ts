import { Application, Request, Response } from "express";
import { UsersTable, User} from "../models/user";
import { createToken, verifyToken } from "../utils/token";

// ************************
// USER HANDLERS
// ************************
const usersTable = new UsersTable();

// INDEX
const index = async(req: Request, res: Response) => {

  // verfiy token
  const token = req.body.token;
  const isVerified = verifyToken(token);
  if(!isVerified){
    res.status(401).json(`Not authorized`)
    return
  }

  // response
  try{
    const users = await usersTable.index();
    res.json(users);
  }catch(err){
    res.status(404).json(err);
  }
}

// SHOW
const show = async(req: Request, res: Response) => {

  // verfiy token
  const token = req.body.token;
  const isVerified = verifyToken(token);
  if(!isVerified){
    res.status(401).json(`Not authorized`)
    return
  }

  // response
  const id = req.body.id;
  try{
    const result = await usersTable.show(id);
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// CREATE 
const create = async(req: Request, res: Response) => {

  // verfiy token
  const token = req.body.token;
  const isVerified = verifyToken(token);
  if(!isVerified){
    res.status(401).json(`Not authorized`)
    return
  }

  // response
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
  const id = req.body.id;
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
  app.get('/users',index);
  app.get('/users/:id',show);
  app.post('/users',create)
  app.delete('/users',destroy)
  app.post('/users/authenticate',authenticate)
}

