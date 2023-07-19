import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const isAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).send("Access Denied");
    } else {
      try {
        const verified: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        res.locals.user = verified;
        next();
      } catch (error) {
        next(error);
      }
    }

    // try {
    //   const verified: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    //   res.locals.user = verified;
    //   next();
    // } catch (error) {
    //   next(error);
    // }
  }
);
