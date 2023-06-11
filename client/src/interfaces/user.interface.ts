export interface User {
  id: string | number;
  name: string;
  email: string;
  picture: string;
  hours: {
    ojtHours: number;
    rendered: number;
    pending: number;
  };
  completedTask: number;
}
