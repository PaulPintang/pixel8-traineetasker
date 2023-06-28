import { ITrainee } from "../interfaces/user.interface";

export const userData: ITrainee = {
  name: "",
  email: "",
  picture: "",
  school: "",
  course: "",
  hours: {
    ojtHours: 0,
    pending: 0,
    rendered: 0,
  },
  completedTask: 0,
};
