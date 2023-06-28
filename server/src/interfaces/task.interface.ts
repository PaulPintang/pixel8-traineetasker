export interface ITask {
  _id?: string | null;
  taskname?: string;
  ticketno?: string;
  deliverable?: string;
  status?: "inprogress" | "forqa" | "new" | "failed" | "completed" | "pending";
  spent?: string;
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
  todos?: [
    {
      isDone: boolean;
      todo: string;
    }
  ];
  createdAt?: Date;
  updatedAt?: Date;
}
