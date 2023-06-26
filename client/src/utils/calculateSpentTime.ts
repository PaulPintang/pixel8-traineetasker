import { formatDateTime } from "./formatDateTime";

type TimeSpent = {
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
          new Date(`2000/01/01 ${time.morning?.start?.replace("APM", "")}`) -
            new Date(`2000/01/01 ${time.morning?.end?.replace("APM", "")}`)
        ) / 3600000
      ),
      minutes: Math.floor(
        (Math.abs(
          new Date(`2000/01/01 ${time.morning?.start?.replace("APM", "")}`) -
            new Date(`2000/01/01 ${time.morning?.end?.replace("APM", "")}`)
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
          new Date(`2000/01/01 ${time.afternoon?.start?.replace("APM", "")}`) -
            new Date(`2000/01/01 ${time.afternoon?.end?.replace("APM", "")}`)
        ) / 3600000
      ),
      minutes: Math.floor(
        (Math.abs(
          new Date(`2000/01/01 ${time.afternoon?.start?.replace("APM", "")}`) -
            new Date(`2000/01/01 ${time.afternoon?.end?.replace("APM", "")}`)
        ) %
          3600000) /
          60000
      ),
    },
  };

  const spent = {
    morning,
    afternoon,
  };

  return spent;
};
