import { Schema, model } from "mongoose";
import { IAccount } from "../interfaces/user.interface";

const accountSchema = new Schema<IAccount>({
  name: {
    type: String,
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
  picture: {
    type: String,
  },
  course: {
    type: String,
  },
  role: {
    type: String,
  },
});

export default model<IAccount>("Account", accountSchema);
