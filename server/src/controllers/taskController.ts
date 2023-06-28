import asyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";
import { IAccount, ITrainee } from "../interfaces/user.interface";
import Task from "../models/taskModel";
import Account from "../models/accountModel";
import Trainee from "../models/traineeModel";
import { initialTask } from "../data/task";
import { ITask } from "../interfaces/task.interface";
import { formatDateTime } from "../utils/formatDateTime";
import { checkTime } from "../utils/checkTime";
import { calculateSpentTime } from "../utils/calculateSpentTime";

export const getAllTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { role, email } = res.locals.user;

    // if (role === "admin") {
    //   const tasks = await Task.find();
    //   res.json(tasks);
    // } else {
    const account = await Account.findOne({ email });
    if (account.role !== "trainee") {
      const tasks = await Task.find({ course: account.course });
      res.json(tasks);
    } else {
      const tasks = await Task.find({ assign: account.name });
      res.json(tasks);
    }
    // const tasks = await Task.find({ assign: "", course: account.course });
    // res.json(tasks);
    // }
  }
);

export const assignTask = asyncHandler(
  async (
    req: Request<{}, {}, { _id: string; name: string }, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { _id, name } = req.body;
    if (
      res.locals.user.role === "Task manager" ||
      res.locals.user.role === "QA Personnel"
    ) {
      const task = await Task.findByIdAndUpdate(
        _id,
        {
          assign: name,
        },
        { new: true }
      );
      res.json(task);
    } else {
      res.status(403);
      throw new Error("Failed assigning task!");
    }
  }
);
export const updateTaskStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const date: Date = new Date();
    const format = formatDateTime(date.toISOString());
    const { _id, status } = req.body;
    const role = res.locals.user.role;
    const traineeTaskStatus = ["inprogress", "forqa", "completed"];
    const QATaskStatus = ["failed", "completed"];
    const task = await Task.findById(_id);
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        status:
          role === "QA Personnel" && QATaskStatus.includes(status)
            ? status
            : role === "trainee" &&
              traineeTaskStatus.includes(status) &&
              status,
        timeline: {
          startedAt:
            role === "trainee" &&
            status === "inprogress" &&
            !task.timeline.startedAt
              ? date.toISOString()
              : task.timeline.startedAt,
          doneAt:
            role === "trainee" && status === "forqa" && !task.timeline.doneAt
              ? date.toISOString()
              : task.timeline.doneAt,
          completedAt:
            role === "QA Personnel" &&
            status === "completed" &&
            !task.timeline.completedAt
              ? date.toISOString()
              : task.timeline.completedAt,
          revisions:
            role === "QA Personnel" && status === "failed"
              ? [...task.timeline.revisions, date.toISOString()]
              : task.timeline.revisions,
        },
      },
      { new: true }
    );

    // ? IF THE TRAINEE MARK THE TASK AS DONE, READY FOR QA
    if (status === "forqa" || status === "inprogress") {
      const time = checkTime();
      const trainee = await Trainee.findOne({ email: res.locals.user.email });
      const timesheet = trainee.timesheet;
      const sheet = trainee.timesheet.findIndex(
        (record) => record.status === "recording"
      );
      const taskonsheet = await Task.findOne({
        ticketno: timesheet[sheet].ticket,
      });

      if (time === "morning") {
        timesheet[sheet].morning.end = format.time;
      }
      if (time === "afternoon") {
        timesheet[sheet].afternoon.end = format.time;
      }

      if (status === "inprogress") {
      }
      // UPDATING TASK SPENT

      const tasksheet = timesheet.filter((item) => item.status === "recording");
      // const tasksheet = timesheet.filter(
      //   (item) => item.ticket === task.ticketno
      // );

      const totalMorningSpentTime = tasksheet.reduce((total, item) => {
        const morningStart = new Date(`2000/01/01 ${item.morning.start}`);
        const morningEnd = new Date(`2000/01/01 ${item.morning.end}`);
        const morningTimeDiff = Math.abs(
          morningEnd.getTime() - morningStart.getTime()
        );
        const morningHours = Math.floor(morningTimeDiff / 3600000);
        const morningMinutes = Math.floor((morningTimeDiff % 3600000) / 60000);
        return total + morningHours * 60 + morningMinutes;
      }, 0);

      const totalAfternoonSpentTime = tasksheet.reduce((total, item) => {
        const afternoonStart = new Date(`2000/01/01 ${item.afternoon.start}`);
        const afternoonEnd = new Date(`2000/01/01 ${item.afternoon.end}`);
        const afternoonTimeDiff = Math.abs(
          afternoonEnd.getTime() - afternoonStart.getTime()
        );
        const afternoonHours = Math.floor(afternoonTimeDiff / 3600000);
        const afternoonMinutes = Math.floor(
          (afternoonTimeDiff % 3600000) / 60000
        );
        return total + afternoonHours * 60 + afternoonMinutes;
      }, 0);

      let spent = "";
      let totalHours = 0;
      let totalMinutes = 0;
      totalMinutes = totalMorningSpentTime + totalAfternoonSpentTime;

      // Handle carry-over from minutes to hours
      if (totalMinutes >= 60) {
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes %= 60;
      }

      if (totalHours !== 0) {
        spent += `${totalHours}hr${totalHours !== 1 ? "s" : ""}`;
      }

      if (totalMinutes !== 0) {
        spent += `${totalMinutes}min${totalMinutes !== 1 ? "s" : ""}`;
      }

      await Task.findByIdAndUpdate(
        taskonsheet._id,
        {
          spent,
          status: status === "inprogress" ? "pending" : taskonsheet.status,
        },
        { new: true }
      );

      timesheet[sheet].status = "recorded";

      // END

      await Trainee.findByIdAndUpdate(
        trainee._id,
        {
          timesheet: timesheet,
        },
        {
          new: true,
        }
      );
    }

    res.json(updatedTask);
  }
);

export const addTask = asyncHandler(
  async (
    req: Request<{}, {}, ITask, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { role, email } = res.locals.user;
    const { taskname, ticketno, deliverable } = req.body;
    if (role === "Task manager") {
      const supervisor = await Account.findOne({ email });
      const exist = await Task.findOne({ deliverable });
      if (exist) throw new Error("Task already exist!");

      const task = await Task.create({
        ...initialTask,
        taskname,
        ticketno,
        deliverable,
        course: supervisor.course,
        comments: [],
      });
      res.json(task);
    } else {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
);
export const updateTask = asyncHandler(async () => {});

export const taskComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.body._id);
    await Task.findByIdAndUpdate(req.body._id, {
      comments: [
        ...task.comments,
        {
          by: req.body.by,
          msg: req.body.msg,
        },
      ],
    });
    res.json("Comment added");
  }
);

export const deleteTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json(task);
  }
);

export const addUpdateTaskTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id);
    const todos = await Task.findByIdAndUpdate(
      task._id,
      {
        todos: req.body,
      },
      { new: true }
    );
    res.json(todos.todos);
  }
);
