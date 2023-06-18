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
}

export interface IPixel8Acc extends IAccount {
  trainees: number;
}
