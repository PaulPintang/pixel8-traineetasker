import { Schema, model } from "mongoose";
import { ITask } from "../interfaces/task.interface";

const taskSchema = new Schema<ITask>(
  {
    taskname: {
      type: String,
    },
    ticketno: {
      type: String,
    },
    deliverable: {
      type: String,
    },
    status: {
      type: String,
    },
    assign: {
      type: String,
    },
    spent: {
      type: String,
    },
    todos: {
      type: [
        {
          isDone: Boolean,
          todo: String,
        },
      ],
    },
    course: {
      type: String,
    },
    comments: [
      {
        by: String,
        msg: String,
        date: Date,
      },
    ],
    timeline: {
      createdAt: String,
      startedAt: String,
      doneAt: String,
      completedAt: String,
      revisions: [String],
    },
    // createdAt: String,
  }
  // {
  //   timestamps: true,
  // }
);

export default model<ITask>("Task", taskSchema);
