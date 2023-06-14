export interface ITask {
  _id?: string | null;
  taskname?: string;
  ticketno?: string;
  deliverable?: string;
  status?: "inprogress" | "forqa" | "new" | "failed" | "completed";
  createdAt?: Date;
  started?: string;
  assign?: string;
  timeline?: string;
  comments?: [
    {
      by: string;
      msg: string;
    }
  ];
  spent?: number;
  todos?: string[];
  course?: string;
}
