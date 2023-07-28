export interface ISheets {
  trainee?: string;
  date: string;
  task: string;
  ticket: string;
  status: "recorded" | "recording";
  spent?: string;
  morning: {
    start: string;
    end: string;
  };
  afternoon: {
    start: string;
    end: string;
  };
}

export interface IDtr {
  date?: string;
  morning?: {
    in: string;
    out: string;
  };
  afternoon?: {
    in: string;
    out: string;
  };
  status?: "recorded" | "recording";
}

export interface Notification {
  _id?: string;
  task: string;
  type: "comment" | "task";
  to: string[];
  from: {
    name: string;
    picture: string;
  };
  content: string;
  comment?: string;
  date?: string;
  course?: string;
}
