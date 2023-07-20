import asyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";
import Task from "../models/taskModel";
import Account from "../models/accountModel";
import Trainee from "../models/traineeModel";
import { initialTask } from "../data/task";
import { ITask } from "../interfaces/task.interface";
import { formatDateTime, handleTimeCarryOver } from "../utils/formatDateTime";
import { checkTime } from "../utils/checkTime";
import { taskTotalSpent } from "../utils/taskTotalSpent";
import { handleTaskSpent } from "../utils/DTRFunctions";
import { addTimeStrings } from "../utils/calculateSpentTime";
import { ISheets } from "../interfaces/records.interface";

export const getAllTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = res.locals.user;
    const account = await Account.findOne({ email });
    if (account.role !== "trainee") {
      const tasks = await Task.find({ course: account.course });
      res.json(tasks);
    } else {
      const tasks = await Task.find({ assign: account.name });
      res.json(tasks);
    }
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
    const format = formatDateTime();
    const { _id, status } = req.body;
    const role = res.locals.user.role;
    const traineeTaskStatus = ["inprogress", "forqa"];
    const QATaskStatus = ["failed", "completed"];
    const task = await Task.findById(_id);
    const trainee = await Trainee.findOne({
      name: task.assign,
    });

    // const taskonsheet = await Task.findOne({
    //   ticketno: trainee.timesheet[sheet].ticket,
    // });

    const sheet = trainee.timesheet.findIndex(
      (record) => record.status === "recording"
    );

    const dateTime = `${format.date} at ${format.time}`;

    let totalHours = 0;
    let totalMinutes = 0;
    let timesheet: ISheets[] = [];
    // let taskonsheet: ITask | null = null;

    // console.log("pota", taskonsheet);
    // ** IF the trainee mark tha task as forqa then update the task timesheet.
    if (status === "forqa" && role === "trainee") {
      // ****

      timesheet = trainee.timesheet;
      // ****

      const time = checkTime();
      const sheet = trainee.timesheet.findIndex(
        (record) => record.status === "recording"
      );

      // taskonsheet = await Task.findOne({
      //   ticketno: timesheet[sheet].ticket,
      // });

      // console.log(taskonsheet);
      if (time === "morning") {
        timesheet[sheet].morning.end = format.time;
      }
      if (time === "afternoon") {
        timesheet[sheet].afternoon.end = format.time;
      }

      const { totalAfternoonSpentTime, totalMorningSpentTime } =
        taskTotalSpent(trainee);

      totalMinutes += totalMorningSpentTime + totalAfternoonSpentTime;
      timesheet[sheet].status = "recorded";
    }
    // *** END

    const totalSpent = handleTimeCarryOver(totalHours, totalMinutes);

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
              ? dateTime
              : task.timeline.startedAt,
          doneAt:
            role === "trainee" && status === "forqa" && !task.timeline.doneAt
              ? dateTime
              : task.timeline.doneAt,
          completedAt:
            role === "QA Personnel" &&
            status === "completed" &&
            !task.timeline.completedAt
              ? dateTime
              : task.timeline.completedAt,
          revisions:
            role === "QA Personnel" && status === "failed"
              ? [...task.timeline.revisions, date.toISOString()]
              : task.timeline.revisions,
        },
        spent:
          task.spent === ""
            ? totalSpent
            : addTimeStrings(task.spent, totalSpent),
      },
      { new: true }
    );

    const updatedProfile = await Trainee.findByIdAndUpdate(
      trainee._id,
      {
        timesheet: status === "forqa" ? timesheet : trainee.timesheet,
      },
      {
        new: true,
      }
    );
    res.json({ updatedTask, updatedProfile });
    // } else {
    //   res.json({ updateTask });
    // }

    // ? IF THE TRAINEE MARK THE TASK AS DONE, READY FOR QA
    // if (status === "forqa" || status === "inprogress") {
    //   const time = checkTime();
    //   const trainee = await Trainee.findOne({ email: res.locals.user.email });
    //   const timesheet = trainee.timesheet;
    //   const sheet = trainee.timesheet.findIndex(
    //     (record) => record.status === "recording"
    //   );

    //   const taskonsheet = await Task.findOne({
    //     ticketno: timesheet[sheet].ticket,
    //   });

    //   if (time === "morning") {
    //     timesheet[sheet].morning.end = format.time;
    //   }
    //   if (time === "afternoon") {
    //     timesheet[sheet].afternoon.end = format.time;
    //   }

    //   // ** GETTING THE TOTAL SPENT TIME OF MORNING AND AFTERNOON SPENT TIME
    //   // *** morning and afternoon calculate time, for example: 08:00 to 12:00 = 4hrs
    //   const { totalAfternoonSpentTime, totalMorningSpentTime } =
    //     taskTotalSpent(trainee);

    //   let totalHours = 0;
    //   let totalMinutes = 0;

    //   totalMinutes += totalMorningSpentTime + totalAfternoonSpentTime;

    //   const totalSpent = handleTimeCarryOver(totalHours, totalMinutes);

    //   // *** SET THE CURRENT IN PROGRESS TASK AS PENDING (Task should only have 1 inprogress task)
    //   const updatedTask = await Task.findByIdAndUpdate(
    //     taskonsheet._id,
    //     {
    //       spent:
    //         taskonsheet.spent === ""
    //           ? totalSpent
    //           : addTimeStrings(taskonsheet.spent, totalSpent),

    //       status: status === "inprogress" ? "pending" : taskonsheet.status,
    //     },
    //     { new: true }
    //   );
    //   // *** END

    //   timesheet[sheet].status = "recorded";
    //   const updatedProfile = await Trainee.findByIdAndUpdate(
    //     trainee._id,
    //     {
    //       timesheet: timesheet,
    //     },
    //     {
    //       new: true,
    //     }
    //   );
    //   res.json({ updatedTask, updatedProfile });
    // }
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
        todos: [],
      });
      res.status(200).json(task);
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
