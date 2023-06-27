export interface ITask {
  _id?: string;
  taskname?: string;
  ticketno?: string;
  deliverable?: string;
  status?: "inprogress" | "forqa" | "new" | "failed" | "completed" | "pending";
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
    revisions: string[];
  };
  spent?: number;
  todos?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
