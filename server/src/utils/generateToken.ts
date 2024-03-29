import jwt from "jsonwebtoken";
import { ITrainee } from "../interfaces/user.interface";
import { Response } from "express";

export const generateToken = (res: Response, payload: ITrainee) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.ENV !== "development", // Use secure cookies in production
    // sameSite: "none", // Prevent CSRF attacks
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
