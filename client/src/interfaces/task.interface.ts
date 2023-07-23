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
      date: string;
    }
  ];
  timeline?: {
    createdAt?: string;
    startedAt?: string;
    doneAt?: string;
    completedAt?: string;
    revisions: string[];
  };
  spent?: string;
  todos?: [
    {
      isDone: boolean;
      todo: string;
    }
  ];
  // createdAt?: string;
  // updatedAt?: string;
}
