import { NextFunction, Request, Response } from "express";
import Trainee from "../models/traineeModel";
import Task from "../models/taskModel";
import Account from "../models/accountModel";
import { ITrainee } from "../interfaces/user.interface";
import asyncHandler from "express-async-handler";
import { formatDateTime, handleTimeCarryOver } from "../utils/formatDateTime";
import { checkTime } from "../utils/checkTime";
import { handleTaskSpent, handleTraineeHourSpent } from "../utils/DTRFunctions";

export const allTrainee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const trainees = await Trainee.find({
      course: req.params.course,
    });
    res.json(trainees);
  }
);

export const addTrainee = asyncHandler(
  async (
    req: Request<{}, {}, ITrainee, {}>,
    res: Response,
    next: NextFunction
  ) => {
    if (res.locals.user.role === "trainee") {
      const { name, email, picture, course } = req.body;
      const user = await Account.create({
        name,
        email,
        picture,
        course,
        role: "trainee",
        timesheet: [],
      });
      await Trainee.create({
        ...req.body,
        hours: {
          ...req.body.hours,
          pending: req.body.hours.ojtHours,
        },
        started: "",
      });
      res.json(user);
    } else {
      res.json(401);
    }
  }
);

export const timeInOutDTR = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const format = formatDateTime();
    if (res.locals.user.role === "trainee") {
      const trainee = await Trainee.findOne({ email: res.locals.user.email });
      const taskInprogress = await Task.findOne({ status: "inprogress" });
      const todayIndex = trainee.dtr.findIndex(
        (record) => record.date === format.date
      );

      const recording = trainee.timesheet.findIndex(
        (record) => record.status === "recording"
      );

      // ?? IF THERE IS TODAY RECORD
      if (todayIndex !== -1) {
        if (trainee.dtr[todayIndex].morning.out === "") {
          const hours = handleTraineeHourSpent(trainee, "morning");
          await Trainee.findByIdAndUpdate(
            trainee._id,
            {
              hours: {
                ...trainee.hours,
                ...hours,
              },
            },
            {
              new: true,
            }
          );
          // ?? morning timesheet end
          if (recording !== -1) {
            const { spent, existingHours, existingMinutes } = handleTaskSpent({
              trainee,
              taskInprogress,
              recording,
              day: "morning",
            });

            const totalHours = parseInt(existingHours) + spent.totalSpent.hours;
            const totalMinutes =
              parseInt(existingMinutes) + spent.totalSpent.minutes;

            const newSpent = handleTimeCarryOver(totalHours, totalMinutes);

            await Task.findByIdAndUpdate(
              taskInprogress._id,
              {
                spent: newSpent,
              },
              { new: true }
            );
          }
        } else if (trainee.dtr[todayIndex].afternoon.in === "") {
          // trainee.dtr[todayIndex].afternoon.in = "01:00 PM";
          trainee.dtr[todayIndex].afternoon.in = format.time;
          if (recording !== -1) {
            trainee.timesheet[recording].afternoon.start = format.time;
          }
        } else if (trainee.dtr[todayIndex].afternoon.out === "") {
          const hours = handleTraineeHourSpent(trainee, "afternoon");
          await Trainee.findByIdAndUpdate(
            trainee._id,
            {
              hours: {
                ...trainee.hours,
                ...hours,
              },
            },
            {
              new: true,
            }
          );
          // ?? afternoon timesheet end
          if (recording !== -1) {
            const { spent, existingHours, existingMinutes } = handleTaskSpent({
              trainee,
              taskInprogress,
              recording,
              day: "afternoon",
            });

            const totalHours = parseInt(existingHours) + spent.totalSpent.hours;
            const totalMinutes =
              parseInt(existingMinutes) + spent.totalSpent.minutes;

            const newSpent = handleTimeCarryOver(totalHours, totalMinutes);
            await Task.findByIdAndUpdate(
              taskInprogress._id,
              {
                spent: newSpent,
              },
              { new: true }
            );
          }
        }
      } else {
        // ?? IF THERE'S NO TODAY DTR
        trainee.dtr.push({
          date: format.date,
          status: "recording",
          morning: {
            // in: "08:00 AM",
            in: format.time,
            out: "",
          },
          afternoon: {
            in: "",
            out: "",
          },
        });

        // ?? IF THERE IS INPROGRESS TASK
        // if (todayIndex === -1 && taskInprogress) {
        //   const time = checkTime();
        //   trainee.timesheet.push({
        //     task: taskInprogress.taskname,
        //     ticket: taskInprogress.ticketno,
        //     status: "recording",
        //     date: format.date,
        //     morning: {
        //       start: time === "morning" ? format.time : "",
        //       end: "",
        //     },
        //     afternoon: {
        //       start: time === "afternoon" ? format.time : "",
        //       end: "",
        //     },
        //   });
        // }
      }
      const update = await Trainee.findByIdAndUpdate(
        trainee._id,
        {
          started: trainee.started === "" ? format.date : trainee.started,
          dtr: trainee.dtr,
          timesheet: trainee.timesheet,
        },
        {
          new: true,
        }
      );
      res.json(update);
    }
  }
);

export const addTaskTimeSheet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const format = formatDateTime();
    const time = checkTime();
    if (res.locals.user.role === "trainee") {
      // ? add check if the trainee start the task in the morning time or afternoon
      const sheet = {
        ...req.body,
        status: "recording",
        date: format.date,
        morning: {
          start: time === "morning" ? format.time : "",
          end: "",
        },
        afternoon: {
          start: time === "afternoon" ? format.time : "",
          end: "",
        },
      };
      const trainee = await Trainee.findOne({ email: res.locals.user.email });
      const timesheet = await Trainee.findByIdAndUpdate(
        trainee._id,
        {
          timesheet: [...trainee.timesheet, sheet],
        },
        { new: true }
      );
      res.json(timesheet);
    }
  }
);

export const getTraineeProfile = asyncHandler(
  async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { role } = res.locals.user;
    if (role === "supervisor" || role === "admin") {
      const trainee = await Trainee.findById(req.params.id);
      res.json(trainee);
    } else {
      const account = await Account.findOne({
        email: res.locals.user.email,
      });
      const trainee = await Trainee.findOne({ email: account.email });
      res.json(trainee);
    }
  }
);
