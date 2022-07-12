import { verifyToken } from "../utils/token";
import { Request, Response } from "express";

export const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      const isVerified = verifyToken(token);
      if (!isVerified) {
        res.status(401).json("Not authorized");
        return;
      }
    }else{
      res.status(401).json("Please provide an auth token");
      return;
    }
  } catch (err) {
    res.status(401).json(err);
  }
  next();
};
