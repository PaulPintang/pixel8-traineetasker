export interface IAccount {
  _id?: string;
  name?: string;
  email?: string;
  picture?: string;
  role?: "admin" | "supervisor" | "trainee" | "";
}

export interface ITrainee extends IAccount {
  school?: string;
  course?: string;
  hours?: {
    ojtHours: number;
    rendered: number;
    pending: number;
  };
  completedTask?: number;
}

export interface IPixel8Acc extends IAccount {
  course: string;
  trainees: number;
}
