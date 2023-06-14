export interface ITask {
  id?: string | number | null;
  taskname?: string;
  ticketno?: string;
  deliverable?: string;
  status?: "inprogress" | "forqa" | "new" | "failed" | "completed";
  added?: string;
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
