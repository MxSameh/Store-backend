import { verifyToken } from "../utils/token";
import { Request,Response } from "express";

export const verifyAuthToken = (req: Request, res: Response, next : any) => {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    const isVerified = verifyToken(token);

    if(! isVerified){
      res.status(401).json('Not authorized');
      return
    }
    next();
}