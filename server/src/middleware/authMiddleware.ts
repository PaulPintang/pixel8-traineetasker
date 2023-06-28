import { Request, Response, NextFunction } from "express";
import Account from "../models/accountModel";
import asyncHandler from "express-async-handler";

import jwt from "jsonwebtoken";
import { IAccount } from "../interfaces/user.interface";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    res.locals.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};
