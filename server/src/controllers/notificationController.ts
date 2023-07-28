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
      const notifications = await Notification.find({
        to: { $in: [account.name] },
        course: account.course,
      });
      res.json(notifications);
    } else {
      const account = await Account.findOne({ email: res.locals.user.email });
      const notifications = await Notification.find({
        to: { $in: [account.role] },
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
    const recipients = ["QA Personnel", "Task manager", "supervisor", "admin"];
    const newNotification = await Notification.create({
      ...req.body,
      to: res.locals.user.role === "trainee" ? recipients : req.body.to,
      date: new Date().toISOString(),
      comment: req.body.type === "comment" ? req.body.comment : null,
    });
    res.json(newNotification);
  }
);

export const readNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role === "trainee") {
      const notification = await Notification.findByIdAndDelete(req.params.id);
      res.json(notification);
    } else {
      const notification = await Notification.findById(req.params.id);
      const unread = notification.to.filter(
        (notif) => notif !== res.locals.user.role
      );
      if (unread.length === 0) {
        const notification = await Notification.findByIdAndDelete(
          req.params.id
        );
        res.json(notification);
      } else {
        const read = await Notification.findByIdAndUpdate(req.params.id, {
          to: unread,
        });
        res.json(read);
      }
    }
  }
);

export const readAllNotification = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const account = await Account.findOne({ email: res.locals.user.email });

    const filter = {
      task: req.body.task,
      to: { $in: [account.role === "trainee" ? account.name : account.role] },
      course: account.course,
    };

    if (account.role === "trainee") {
      const notif = await Notification.deleteMany(filter);
      res.json(notif);
    } else {
      const update = await Notification.updateMany(filter, {
        $pull: { to: account.role },
      });
      res.json(update);
    }
  }
);
