export interface IUser {
  _id?: string;
  name?: string;
  email?: string;
  picture?: string;
  school?: string;
  course?: string;
  hours?: {
    ojtHours: number;
    rendered: number;
    pending: number;
  };
  completedTask?: number;
}
