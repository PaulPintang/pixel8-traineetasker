export interface ITask {
  _id?: string | null;
  taskname?: string;
  ticketno?: string;
  deliverable?: string;
  status?: "inprogress" | "forqa" | "new" | "failed" | "completed";
  assign?: string;
  course?: string;
  comments?: [
    {
      by: string;
      msg: string;
    }
  ];
  timeline?: {
    startedAt?: Date;
    doneAt?: Date;
    completedAt?: Date;
    failedDates: Date[];
  };
  spent?: number;
  todos?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
