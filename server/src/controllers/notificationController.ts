import { Response, Request, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel";
import Account from "../models/accountModel";
import { Notification as INotitification } from "../interfaces/records.interface";

export const getNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role === "trainee") {
      const account = await Account.findOne({ email: res.locals.user.email });
      const notifications = await Notification.find({ to: account.name });
      res.json(notifications);
    } else if (
      res.locals.user.role === "QA Personnel" ||
      res.locals.user.role === "Task manager"
    ) {
      const notifications = await Notification.find({
        to: "",
      });
      res.json(notifications);
    }
  }
);

export const pushNotification = asyncHandler(
  async (
    req: Request<{}, {}, INotitification, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const newNotification = await Notification.create({
      task: req.body.task,
      type: req.body.type,
      to: req.body.to,
      from: {
        name: req.body.from.name,
        picture: req.body.from.picture,
      },
      content: req.body.content,
      date: new Date().toISOString(),
      comment: req.body.type === "comment" ? req.body.comment : null,
    });

    res.json(newNotification);
  }
);

export const readNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const readAllNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
