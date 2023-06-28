import asyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";

export const getAccountRole = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // const roles = ["trainee", "admin", "supervisor"];
    // const user = res.locals.user;
    // if (!roles.includes(user.role)) {
    //   throw new Error("Unauthorized Request!");
    // } else {
    //   res.locals.role =
    //     user.role === "trainee"
    //       ? "trainee"
    //       : user.role === "supervisor"
    //       ? "supervisor"
    //       : "admin";
    //   next();
    // }
  }
);
