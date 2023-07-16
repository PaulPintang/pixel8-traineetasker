import { IDtr, ISheets } from "./records.interface";

export interface IAccount {
  _id?: string;
  name?: string;
  email?: string;
  picture?: string;
  course?: string;
  role?: "admin" | "supervisor" | "trainee" | "Task manager" | "QA Personnel";
}

export interface ITrainee extends IAccount {
  school?: string;
  started?: string;
  hours?: {
    ojtHours: number;
    rendered: number;
    pending: number;
  };
  completedTask?: number;
  timesheet?: ISheets[];
  dtr?: IDtr[];
}
