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
  hours?: {
    ojtHours: number;
    rendered: number;
    pending: number;
  };
  completedTask?: number;
  timesheet?: ISheets[];
  dtr?: IDtr[];
}

export interface IPixel8Acc extends IAccount {
  course: string;
  trainees: number;
}

export interface TokenPayload {
  email: string;
  role?: "admin" | "supervisor" | "trainee" | "Task manager" | "QA Personnel";
}