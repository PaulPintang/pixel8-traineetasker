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
import { ITrainee } from "../interfaces/user.interface";

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
    const format = formatDateTime();
    const { _id, status } = req.body;
    const role = res.locals.user.role;
    const traineeTaskStatus = ["inprogress", "forqa"];
    const QATaskStatus = ["failed", "completed"];
    const spentTimeFormat = `${format.date} at ${format.time}`;

    // *** Trainee functions
    let updatedTask: ITask | null = null;
    const task = await Task.findById(_id);
    const trainee = await Trainee.findOne({ email: res.locals.user.email });

    if (traineeTaskStatus.includes(status) && role === "trainee") {
      const time = checkTime();
      const timesheet = trainee.timesheet;
      const taskonsheet = trainee.timesheet.findIndex(
        (task) => task.status === "recording"
      );
      // ** findIndex return -1 if not found
      const isThereExistingInProgress = taskonsheet !== -1;

      //*** mark as done,new inprogress, and revise failed task (computing time spent) and stop current recording timesheet
      if (status === "forqa") {
        let totalHours = 0;
        let totalMinutes = 0;
        let totalSpent = "";
        // ** handling timesheet
        if (time === "morning") {
          timesheet[taskonsheet].morning.end = format.time;
        }
        if (time === "afternoon") {
          timesheet[taskonsheet].afternoon.end = format.time;
        }
        // *** enddddd

        // *** handling totalspent
        const { totalAfternoonSpentTime, totalMorningSpentTime } =
          taskTotalSpent(trainee);
        totalMinutes += totalMorningSpentTime + totalAfternoonSpentTime;
        totalSpent = handleTimeCarryOver(totalHours, totalMinutes);
        // *** end
        timesheet[taskonsheet].status = "recorded";

        updatedTask = await Task.findByIdAndUpdate(
          task._id,
          {
            status: "forqa",
            timeline: {
              ...task.timeline,
              doneAt: new Date().toISOString(),
            },
            spent:
              task.spent === ""
                ? totalSpent
                : addTimeStrings(task.spent, totalSpent),
          },
          { new: true }
        );
      }

      // ** a task new inprogress, create new timesheet
      if (status === "inprogress") {
        updatedTask = await Task.findByIdAndUpdate(
          task._id,
          {
            status: "inprogress",
            timeline: {
              ...task.timeline,
              startedAt: !task.timeline.startedAt
                ? spentTimeFormat
                : task.timeline.startedAt,
            },
          },
          { new: true }
        );

        if (isThereExistingInProgress) {
          let totalHours = 0;
          let totalMinutes = 0;
          let totalSpent = "";

          if (time === "morning") {
            timesheet[taskonsheet].morning.end = format.time;
          }
          if (time === "afternoon") {
            timesheet[taskonsheet].afternoon.end = format.time;
          }
          const { totalAfternoonSpentTime, totalMorningSpentTime } =
            taskTotalSpent(trainee);
          totalMinutes += totalMorningSpentTime + totalAfternoonSpentTime;
          totalSpent = handleTimeCarryOver(totalHours, totalMinutes);

          timesheet[taskonsheet].status = "recorded";

          const toPendingTask = await Task.findOne({
            ticketno: timesheet[taskonsheet].ticket,
          });

          updatedTask = await Task.findByIdAndUpdate(
            toPendingTask._id,
            {
              status: "pending",
              spent:
                toPendingTask.spent === ""
                  ? totalSpent
                  : addTimeStrings(toPendingTask.spent, totalSpent),
            },
            { new: true }
          );
        }
        const sheet: ISheets = {
          task: task.taskname,
          ticket: task.ticketno,
          status: "recording",
          date: format.date,
          morning: {
            start: time === "morning" ? format.time : "",
            // start: "08:00 AM",
            end: "",
          },
          afternoon: {
            start: time === "afternoon" ? format.time : "",
            // start: "",
            end: "",
          },
        };
        timesheet.push(sheet);
      }
      const updatedProfile = await Trainee.findByIdAndUpdate(
        trainee._id,
        {
          timesheet,
        },
        {
          new: true,
        }
      );

      res.json({ updatedTask, updatedProfile });
    }

    if (QATaskStatus.includes(status) && role !== "trainee") {
      if (status === "completed") {
        updatedTask = await Task.findByIdAndUpdate(
          task._id,
          {
            status: "completed",
            timeline: {
              ...task.timeline,
              completedAt: spentTimeFormat,
            },
          },
          { new: true }
        );
      } else {
        const date = new Date();
        updatedTask = await Task.findByIdAndUpdate(
          task._id,
          {
            status: "failed",
            timeline: {
              ...task.timeline,
              revisions: [...task.timeline.revisions, spentTimeFormat],
            },
          },
          { new: true }
        );
      }
    }

    res.json({ updatedTask });
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
        timeline: {
          createdAt: `${formatDateTime().date} at ${formatDateTime().time}`,
        },
        // createdAt: `${formatDateTime().date} at ${formatDateTime().time}`,
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
          date: req.body.date,
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
