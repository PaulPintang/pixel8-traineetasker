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
  comments?: string;
  spent?: string;
  todos: string[];
}
