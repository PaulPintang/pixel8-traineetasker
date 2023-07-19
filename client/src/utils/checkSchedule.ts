import { IDtr } from "../interfaces/records.interface";
import { formatDateTime } from "./formatDateTime";

// ?? SCHEDULE IS BASED ON ADMIN GIVEN SCHEDULE TIME
const schedule = {
  morning: {
    in: 8,
    out: 12,
  },
  afternoon: {
    in: 13,
    out: 17,
  },
};

export const checkSchedule = (dtr: IDtr[]) => {
  const date = new Date();
  const currentHour = date.getHours();
  const today = dtr?.find(
    (record) => record.date === formatDateTime(date.toISOString()).date
  );

  const isTimeIn =
    !today && schedule.morning.in === 8
      ? true
      : today?.afternoon?.in === "" && schedule.afternoon.in === 13
      ? true
      : false;
  const isTimeOut =
    today?.morning?.out === "" && schedule.morning.out === 12
      ? true
      : today?.afternoon?.out === "" && schedule.afternoon.out === 17
      ? true
      : false;

  return { isTimeIn, isTimeOut, today };
};
