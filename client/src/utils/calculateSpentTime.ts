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
              `2000/01/01 ${
                time.morning?.end === ""
                  ? format.time.replace("APM", "")
                  : time.morning?.end?.replace("APM", "")
              }`
            ).getTime()
        ) / 3600000
      ),
      minutes: Math.floor(
        (Math.abs(
          new Date(
            `2000/01/01 ${time.morning?.start?.replace("APM", "")}`
          ).getTime() -
            new Date(
              `2000/01/01 ${
                time.morning?.end === ""
                  ? format.time.replace("APM", "")
                  : time.morning?.end?.replace("APM", "")
              }`
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
              `2000/01/01 ${
                time.afternoon?.end === ""
                  ? format.time.replace("APM", "")
                  : time.afternoon?.end?.replace("APM", "")
              }`
            ).getTime()
        ) / 3600000
      ),
      minutes: Math.floor(
        (Math.abs(
          new Date(
            `2000/01/01 ${time.afternoon?.start?.replace("APM", "")}`
          ).getTime() -
            new Date(
              `2000/01/01 ${
                time.afternoon?.end === ""
                  ? format.time.replace("APM", "")
                  : time.afternoon?.end?.replace("APM", "")
              }`
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
        time.status === "recorded" &&
        time.morning?.end &&
        time.afternoon?.end !== ""
          ? morning.spent.hours + afternoon.spent.hours
          : time.morning?.end === ""
          ? afternoon.spent.hours
          : time.afternoon?.start === "" && morning.spent.hours,
      minutes:
        time.status === "recorded" &&
        time.morning?.end &&
        time.afternoon?.end !== ""
          ? morning.spent.minutes + afternoon.spent.minutes
          : time.morning?.end === ""
          ? afternoon.spent.minutes
          : time.afternoon?.start === "" && morning.spent.minutes,
    },
    morning,
    afternoon,
  };

  return spent;
};
