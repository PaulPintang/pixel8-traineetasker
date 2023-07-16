import { Schema, model } from "mongoose";
import { ITrainee } from "../interfaces/user.interface";
import { ISheets, IDtr } from "../interfaces/records.interface";

const timeSheetSchema = new Schema<ISheets>({
  trainee: String,
  date: String,
  task: String,
  ticket: String,
  status: String,
  spent: String,
  morning: {
    start: String,
    end: String,
  },
  afternoon: {
    start: String,
    end: String,
  },
});

const dtrSchema = new Schema<IDtr>({
  date: String,
  status: String,
  morning: {
    in: String,
    out: String,
  },
  afternoon: {
    in: String,
    out: String,
  },
});

const traineeModel = new Schema<ITrainee>({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
    unique: true,
  },
  timesheet: { type: [timeSheetSchema] },
  dtr: { type: [dtrSchema] },
  picture: {
    type: String,
  },
  school: {
    type: String,
  },
  started: {
    type: String,
  },
  course: {
    type: String,
  },
  hours: {
    ojtHours: Number,
    rendered: Number,
    pending: Number,
  },
  completedTask: Number,
});

export default model<ITrainee>("Trainee", traineeModel);
