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
