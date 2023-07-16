import { NextFunction, Request, Response } from "express";
import Trainee from "../models/traineeModel";
import Task from "../models/taskModel";
import Account from "../models/accountModel";
import { ITrainee } from "../interfaces/user.interface";
import asyncHandler from "express-async-handler";
import { IDtr } from "../interfaces/records.interface";
import { formatDateTime } from "../utils/formatDateTime";
import { checkTime } from "../utils/checkTime";
import { calculateSpentTime } from "../utils/calculateSpentTime";

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

export const addTraineeDTR = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role === "trainee") {
      const date = new Date();
      const format = formatDateTime(date.toISOString());
      // ? add check based on schedule. (ex. 8-5 sched). only proceed to this timeline
      // ?? SCHEDULE IS BASED ON ADMIN GIVEN SCHEDULE TIMEptraineemo
      const record: IDtr = {
        date: format.date,
        status: "recording",
        morning: {
          in: format.time,
          out: "",
        },
        afternoon: {
          in: "",
          out: "",
        },
      };
      const trainee = await Trainee.findOne({ email: res.locals.user.email });
      const dtr = await Trainee.findByIdAndUpdate(
        trainee._id,
        {
          started: trainee.started === "" ? format.date : trainee.started,
          dtr: [...trainee.dtr, record],
        },
        { new: true }
      );

      res.json(dtr);
    }
  }
);

export const updateDtr = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const date = new Date();
    const format = formatDateTime(date.toISOString());
    if (res.locals.user.role === "trainee") {
      const trainee = await Trainee.findOne({ email: res.locals.user.email });
      const taskonsheet = await Task.findOne({ status: "inprogress" });
      const records = trainee.dtr;
      const timesheet = trainee.timesheet;
      const index = trainee.dtr.findIndex(
        (record) => record.date === format.date
      );

      const current = trainee.timesheet.findIndex(
        (record) => record.status === "recording"
      );
      if (index !== -1) {
        if (records[index].morning.out === "") {
          records[index].morning.out = format.time;
          const startHour = records[index].morning.in.split(":")[0];
          const endHour = records[index].morning.out.split(":")[0];
          const startTime = new Date();
          const endTime = new Date();
          startTime.setHours(parseInt(startHour, 10), 0, 0); // Set start time to 8:00 AM
          endTime.setHours(parseInt(endHour, 10), 0, 0); // Set end time to 12:00 PM
          const timeDiff = Math.abs(endTime.getTime() - startTime.getTime()); // Get the time difference in milliseconds
          const hoursSpent = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
          const hours = {
            rendered: trainee.hours.rendered + hoursSpent,
            pending: trainee.hours.pending - hoursSpent,
          };
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
          if (current !== -1) {
            timesheet[current].morning.end = format.time;
            // Extract existing hours and minutes from the existing spent time in the database
            const hoursMatch = taskonsheet.spent.match(/(\d+)hr/);
            const minutesMatch = taskonsheet.spent.match(/(\d+)mins?/);

            const existingHours = hoursMatch ? hoursMatch[1] : "0";
            const existingMinutes = minutesMatch ? minutesMatch[1] : "0";

            const time = {
              status: timesheet[current].status,
              morning: timesheet[current].morning,
              afternoon: timesheet[current].afternoon,
            };
            const spent = calculateSpentTime(time);

            let newSpent = "";
            let totalHours = 0;
            let totalMinutes = 0;

            // Add the existing hours and minutes to the calculated total
            totalHours = parseInt(existingHours) + spent.totalSpent.hours;
            totalMinutes = parseInt(existingMinutes) + spent.totalSpent.minutes;

            // Handle carry-over from minutes to hours
            if (totalMinutes >= 60) {
              totalHours += Math.floor(totalMinutes / 60);
              totalMinutes %= 60;
            }

            if (totalHours !== 0) {
              newSpent += `${totalHours}hr${totalHours !== 1 ? "s" : ""}`;
            }

            if (totalMinutes !== 0) {
              newSpent += `${totalMinutes}min${totalMinutes !== 1 ? "s" : ""}`;
            }

            await Task.findByIdAndUpdate(
              taskonsheet._id,
              {
                spent: newSpent,
              },
              { new: true }
            );
          }
        } else if (records[index].afternoon.in === "") {
          records[index].afternoon.in = format.time;
          if (current !== -1) {
            timesheet[current].afternoon.start = format.time;
          }
        } else if (records[index].afternoon.out === "") {
          records[index].afternoon.out = format.time;
          records[index].status = "recorded";
          const startHour = records[index].afternoon.in.split(":")[0];
          const endHour = records[index].afternoon.out.split(":")[0];
          const startTime = new Date();
          const endTime = new Date();
          startTime.setHours(parseInt(startHour, 10), 0, 0); // Set start time to 8:00 AM
          endTime.setHours(parseInt(endHour, 10), 0, 0); // Set end time to 12:00 PM
          const timeDiff = Math.abs(endTime.getTime() - startTime.getTime()); // Get the time difference in milliseconds
          const hoursSpent = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
          const hours = {
            rendered: trainee.hours.rendered + hoursSpent,
            pending: trainee.hours.pending - hoursSpent,
          };
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
          if (current !== -1) {
            timesheet[current].afternoon.end = format.time;
            timesheet[current].status = "recorded";
            // Extract existing hours and minutes from the existing spent time in the database
            const hoursMatch = taskonsheet.spent.match(/(\d+)hr/);
            const minutesMatch = taskonsheet.spent.match(/(\d+)mins?/);

            const existingHours = hoursMatch ? hoursMatch[1] : "0";
            const existingMinutes = minutesMatch ? minutesMatch[1] : "0";

            const time = {
              status: timesheet[current].status,
              morning: timesheet[current].morning,
              afternoon: timesheet[current].afternoon,
            };
            const spent = calculateSpentTime(time);

            let newSpent = "";
            let totalHours = 0;
            let totalMinutes = 0;

            // Add the existing hours and minutes to the calculated total
            totalHours = parseInt(existingHours) + spent.totalSpent.hours;
            totalMinutes = parseInt(existingMinutes) + spent.totalSpent.minutes;

            // Handle carry-over from minutes to hours
            if (totalMinutes >= 60) {
              totalHours += Math.floor(totalMinutes / 60);
              totalMinutes %= 60;
            }

            if (totalHours !== 0) {
              newSpent += `${totalHours}hr${totalHours !== 1 ? "s" : ""}`;
            }

            if (totalMinutes !== 0) {
              newSpent += `${totalMinutes}min${totalMinutes !== 1 ? "s" : ""}`;
            }

            await Task.findByIdAndUpdate(
              taskonsheet._id,
              {
                spent: newSpent,
              },
              { new: true }
            );
          }
        }
      } else {
        records.push({
          date: format.date,
          status: "recording",
          morning: {
            in: format.time,
            out: "",
          },
          afternoon: {
            in: "",
            out: "",
          },
        });
        // ** add other code here to add timesheet of current inprogress task after morning time in
      }
      const update = await Trainee.findByIdAndUpdate(
        trainee._id,
        {
          dtr: records,
          timesheet: timesheet,
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
    const date = new Date();
    const format = formatDateTime(date.toISOString());
    const time = checkTime();
    if (res.locals.user.role === "trainee") {
      // ? add check if the trainee start the task in the morning time or afternoon
      const sheet = {
        ...req.body,
        status: "recording",
        spent: "",
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
