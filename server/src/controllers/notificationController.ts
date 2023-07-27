import { Response, Request, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Notification from "../models/notificationModel";
import Account from "../models/accountModel";
import Task from "../models/taskModel";
import { Notification as INotitification } from "../interfaces/records.interface";

export const getNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role === "trainee") {
      const account = await Account.findOne({ email: res.locals.user.email });
      const notifications = await Notification.find({ to: account.name });
      res.json(notifications);
    } else {
      const account = await Account.findOne({ email: res.locals.user.email });
      const notifications = await Notification.find({
        to: account.role,
        course: account.course,
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
    if (res.locals.user.role === "trainee" && req.body.type === "comment") {
      const recipients = [
        "QA Personnel",
        "Task manager",
        "supervisor",
        "admin",
      ];
      const user = await Account.findOne({ email: res.locals.user.email });
      async function createNotification(to: string) {
        const notificationData = {
          ...req.body,
          to: to,
          date: new Date().toISOString(),
          course: user.course,
        };

        await Notification.create(notificationData);
      }
      await Promise.all(recipients.map(createNotification));
    } else {
      const newNotification = await Notification.create({
        ...req.body,
        date: new Date().toISOString(),
        comment: req.body.type === "comment" ? req.body.comment : null,
      });
      res.json(newNotification);
    }
  }
);

export const readNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    res.json(notification);
  }
);

export const readAllNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.taskname) {
      const notif = await Notification.deleteMany({ task: req.body.taskname });
      res.json(notif);
    } else {
      const account = await Account.findOne({ email: res.locals.user.email });
      const notif = await Notification.deleteMany({
        to: res.locals.user.role === "trainee" ? account.name : account.role,
      });
      res.json(notif);
    }
  }
);
