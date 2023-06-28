import { Schema } from "mongoose";
import { ITask } from "../interfaces/task.interface";

export const initialTask: ITask = {
  taskname: "",
  ticketno: "",
  deliverable: "",
  status: "new",
  assign: "",
  spent: "",
  todos: [
    {
      isDone: false,
      todo: "test",
    },
  ],
};
