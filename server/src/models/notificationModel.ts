import { Schema, model } from "mongoose";
import { Notification } from "../interfaces/records.interface";

const notificationSchema = new Schema<Notification>({
  task: {
    type: String,
  },
  type: {
    type: String,
  },
  to: {
    type: String,
  },
  from: {
    name: String,
    picture: String,
  },
  content: {
    type: String,
  },
  comment: {
    type: String,
  },
  course: String,
  date: String,
});

export default model<Notification>("Notification", notificationSchema);
