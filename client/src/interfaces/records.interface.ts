export interface ISheets {
  trainee?: string;
  date?: string;
  task?: string;
  ticket?: string;
  status?: "recorded" | "recording";
  spent?: string;
  morning?: {
    start: string;
    end: string;
  };
  afternoon?: {
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
