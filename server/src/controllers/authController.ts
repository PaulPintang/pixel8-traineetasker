import { NextFunction, Request, Response } from "express";
import Account from "../models/accountModel";
import { IAccount } from "../interfaces/user.interface";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken";

// * vulnerable, can bypass login if other account used as request body, it will return a token
export const login = asyncHandler(
  async (
    req: Request<{}, {}, IAccount, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, picture } = req.body;
    const account = await Account.findOne({ email: req.body.email });

    if (!name || !email || !picture) throw new Error("Something went wrong");

    generateToken(res, {
      email: !account ? email : account.email,
      role: !account ? "trainee" : account.role,
    });

    if (!account) {
      res.json({ ...req.body, role: "trainee", course: "" });
    } else {
      const user = await Account.findById(account._id);
      if (user.picture === "" || user.picture !== picture || user.name === "") {
        res.json(updateAccountInfo(user, picture, name));
      } else {
        res.json(user);
      }
    }
  }
);

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const updateAccountInfo = async (
  user: IAccount,
  picture: string,
  name: string
) => {
  const updated = await Account.findByIdAndUpdate(
    user._id,
    { picture, name },
    {
      new: true,
    }
  );
  return updated;
};
