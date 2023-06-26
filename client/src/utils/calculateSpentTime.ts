import { formatDateTime } from "./formatDateTime";

type TimeSpent = {
  status: "recording" | "recorded";
  morning?: {
    start: string | undefined;
    end: string | undefined;
  };
  afternoon?: {
    start: string | undefined;
    end: string | undefined;
  };
};

export const calculateSpentTime = (time: TimeSpent) => {
  const date = new Date();
  const format = formatDateTime(date.toISOString());

  const morning = {
    spent: {
      hours: Math.floor(
        Math.abs(
          new Date(
            `2000/01/01 ${time.morning?.start?.replace("APM", "")}`
          ).getTime() -
            new Date(
              `2000/01/01 ${time.morning?.end?.replace("APM", "")}`
            ).getTime()
        ) / 3600000
      ),
      minutes: Math.floor(
        (Math.abs(
          new Date(
            `2000/01/01 ${time.morning?.start?.replace("APM", "")}`
          ).getTime() -
            new Date(
              `2000/01/01 ${time.morning?.end?.replace("APM", "")}`
            ).getTime()
        ) %
          3600000) /
          60000
      ),
    },
  };
  const afternoon = {
    spent: {
      hours: Math.floor(
        Math.abs(
          new Date(
            `2000/01/01 ${time.afternoon?.start?.replace("APM", "")}`
          ).getTime() -
            new Date(
              `2000/01/01 ${time.afternoon?.end?.replace("APM", "")}`
            ).getTime()
        ) / 3600000
      ),
      minutes: Math.floor(
        (Math.abs(
          new Date(
            `2000/01/01 ${time.afternoon?.start?.replace("APM", "")}`
          ).getTime() -
            new Date(
              `2000/01/01 ${time.afternoon?.end?.replace("APM", "")}`
            ).getTime()
        ) %
          3600000) /
          60000
      ),
    },
  };

  const spent = {
    totalSpent: {
      hours:
        time.status === "recorded"
          ? morning.spent.hours + afternoon.spent.hours
          : "",
      minutes:
        time.status === "recorded"
          ? morning.spent.minutes + afternoon.spent.minutes
          : "",
    },
    morning,
    afternoon,
  };

  return spent;
};
