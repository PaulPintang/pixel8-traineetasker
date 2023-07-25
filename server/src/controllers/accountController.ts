import asyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";
import { IAccount } from "../interfaces/user.interface";
import Account from "../models/accountModel";
import { generateToken } from "../utils/generateToken";

export const getAllAccount = asyncHandler(
  async (
    req: Request<{}, {}, IAccount, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (res.locals.user.role === "admin") {
      const roles = ["QA Personnel", "Task manager", "supervisor"];
      const accounts = await Account.find({ role: { $in: roles } });
      res.json(accounts);
    } else {
      const user = await Account.findOne({ email: res.locals.user.email });
      if (res.locals.user.role === "trainee") {
        const accounts = await Account.find({
          course: user.course,
          role: { $nin: ["admin"] },
        });
        res.json(
          accounts.map((acc) => {
            return {
              name: acc.name,
              picture: acc.picture,
            };
          })
        );
      } else {
        const accounts = await Account.find({
          course: user.course,
          role: { $nin: ["admin", "trainee", "supervisor"] },
        });
        res.json(accounts);
      }
    }
  }
);

export const refetchAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const account = await Account.findOne({ email: res.locals.user.email });
    generateToken(res, { email: account.email, role: account.role });
    res.json(account);
  }
);

export const addAccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, course, newrole } = req.body;
    const role = res.locals.user.role;

    const newroles = ["QA Personnel", "Task manager"];

    if (role === "admin" || role === "supervisor") {
      if (!newroles.includes(newrole)) res.status(500);
      const exist = await Account.findOne({ email: req.body.email });
      if (exist) throw new Error("Account already exist!");
      const account = await Account.create({
        name,
        email,
        course,
        picture: "",
        role: role === "admin" ? "supervisor" : newrole,
      });
      res.json(account);
    } else {
      res.status(401);
    }
  }
);

export const updateAccCourseView = asyncHandler(
  async (
    req: Request<{ course: string }, {}, IAccount, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (res.locals.user.role === "admin") {
      const acc = await Account.findOneAndUpdate(
        { role: res.locals.user.role },
        {
          course: req.params.course,
        },
        {
          returnOriginal: false,
        }
      );
      res.json(acc);
    } else {
      res.status(500);
    }
  }
);

export const updateSupervisorAccount = asyncHandler(
  async (
    req: Request<{ id: string }, {}, IAccount, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (res.locals.user.role === "admin") {
      const account = await Account.findByIdAndUpdate(
        req.params.id,
        {
          email: req.body.email,
        },
        {
          new: true,
        }
      );

      res.json(account);
    } else if (res.locals.user.role === "supervisor") {
      const account = await Account.findByIdAndUpdate(
        req.params.id,
        {
          role: req.body.role,
        },
        {
          new: true,
        }
      );
      res.json(account);
    } else {
      res.status(401);
      throw new Error("Unauthorized!");
    }
  }
);

export const deleteAccount = asyncHandler(
  async (
    req: Request<{ id: string }, {}, IAccount, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (
      res.locals.user.role === "admin" ||
      res.locals.user.role === "supervisor"
    ) {
      await Account.findByIdAndDelete(req.params.id);
      res.send("Deleted");
    } else {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
);
