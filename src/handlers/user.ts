import { Application, Request, Response } from "express";
import { UsersTable, User} from "../models/user";


const usersTable = new UsersTable();

// INDEX
const index = async(req: Request, res: Response) => {
  try{
    const result = await usersTable.index();
    res.json(result);
  }catch(err){
    res.json(err);
  }
}

// SHOW
const show = async(req: Request, res: Response) => {
  const id = req.body.id
  console.log(id);
  
  try{
    const result = await usersTable.show(id);
    res.json(result);
  }catch(err){
    res.json(err);
  }
}

// CREATE 
const create = async(req: Request, res: Response) => {
  try{
    const user : User = {
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      password : req.body.password,
    }
    console.log(user.firstname,user.lastname,user.password);
    
    const result = await usersTable.create(user);
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}

// DELETE
const destroy = async(req: Request, res: Response) => {
  const id = req.body.id;
  try{
    const result = await usersTable.delete(id);
    res.json(result);
  }catch(err){
    res.status(404).json(err);
  }
}



export const user_routes = (app: Application) => {
  app.get('/users',index);
  app.get('/users/:id',show);
  app.post('/users',create)
  app.delete('/users',destroy)
}

