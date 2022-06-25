import jwt, { verify } from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const secret = process.env.TOKEN_SECRET as string;

// CREATE A NEW TOKEN
export const createToken = (data: any) : string => {
  const token = jwt.sign({data: data},secret);
  return token
}


// VERIFY A TOKEN
export const verifyToken = (token : string) : Boolean => {
  try{
    jwt.verify(token,secret);
    return true
  }catch{
    return false
  }
}


