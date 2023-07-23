import { formatDateTime } from "./formatDateTime";
import { ISheets } from "../interfaces/records.interface";

export const calculateSpentTime = (time: ISheets) => {
  const format = formatDateTime();

  const morningStart = new Date(
    `2000/01/01 ${time.morning?.start?.replace("APM", "")}`
  );
  const morningEnd = new Date(
    `2000/01/01 ${
      time.morning?.end === ""
        ? format.time.replace("APM", "")
        : time.morning?.end?.replace("APM", "")
    }`
  );
  const afternoonStart = new Date(
    `2000/01/01 ${time.afternoon?.start?.replace("APM", "")}`
  );
  const afternoonEnd = new Date(
    `2000/01/01 ${
      time.afternoon?.end === ""
        ? format.time.replace("APM", "")
        : time.afternoon?.end?.replace("APM", "")
    }`
  );

  const morningTimeDiff = Math.abs(
    morningEnd.getTime() - morningStart.getTime()
  );
  const morningHours = Math.floor(morningTimeDiff / 3600000);
  const morningMinutes = Math.floor((morningTimeDiff % 3600000) / 60000);

  const afternoonTimeDiff = Math.abs(
    afternoonEnd.getTime() - afternoonStart.getTime()
  );
  const afternoonHours = Math.floor(afternoonTimeDiff / 3600000);
  const afternoonMinutes = Math.floor((afternoonTimeDiff % 3600000) / 60000);

  let totalSpentHours = 0;
  let totalSpentMinutes = 0;

  if (
    time.status === "recorded" &&
    time.morning?.end !== "" &&
    time.afternoon?.end !== ""
  ) {
    totalSpentHours = morningHours + afternoonHours;
    totalSpentMinutes = morningMinutes + afternoonMinutes;
  } else if (time.morning?.end === "" && time.morning.start === "") {
    totalSpentHours = afternoonHours;
    totalSpentMinutes = afternoonMinutes;
  } else if (time.afternoon?.start === "" && time.afternoon.end === "") {
    totalSpentHours = morningHours;
    totalSpentMinutes = morningMinutes;
  } else if (
    time.afternoon?.start !== "" &&
    time.morning?.end !== "" &&
    time.afternoon?.end === ""
  ) {
    totalSpentHours = morningHours + afternoonHours;
    totalSpentMinutes = morningMinutes + afternoonMinutes;
  }

  if (totalSpentMinutes >= 60) {
    totalSpentHours += Math.floor(totalSpentMinutes / 60);
    totalSpentMinutes %= 60;
  }

  const spent = {
    totalSpent: {
      hours: totalSpentHours,
      minutes: totalSpentMinutes,
    },
    morning: {
      spent: {
        hours: morningHours,
        minutes: morningMinutes,
      },
    },
    afternoon: {
      spent: {
        hours: afternoonHours,
        minutes: afternoonMinutes,
      },
    },
  };

  let afternoonSpentString = "";
  if (spent.afternoon.spent.hours === 1) {
    afternoonSpentString = `${spent.afternoon.spent.hours}hr`;
  } else if (spent.afternoon.spent.hours > 1) {
    afternoonSpentString = `${spent.afternoon.spent.hours}hrs`;
  }

  if (spent.afternoon.spent.minutes === 1) {
    afternoonSpentString += `${spent.afternoon.spent.minutes}min`;
  } else if (spent.afternoon.spent.minutes > 1) {
    afternoonSpentString += `${spent.afternoon.spent.minutes}mins`;
  }

  let morningSpentString = "";
  if (spent.morning.spent.hours === 1) {
    morningSpentString = `${spent.morning.spent.hours}hr`;
  } else if (spent.morning.spent.hours > 1) {
    morningSpentString = `${spent.morning.spent.hours}hrs`;
  }
  if (spent.morning.spent.minutes === 1) {
    morningSpentString += `${spent.morning.spent.minutes}min`;
  } else if (spent.morning.spent.minutes > 1) {
    morningSpentString += `${spent.morning.spent.minutes}mins`;
  }

  let totalSpentString = "";
  if (spent.totalSpent.hours === 1) {
    totalSpentString = `${spent.totalSpent.hours}hr`;
  } else if (spent.totalSpent.hours > 1) {
    totalSpentString = `${spent.totalSpent.hours}hrs`;
  }

  if (spent.totalSpent.minutes === 1) {
    totalSpentString += `${spent.totalSpent.minutes}min`;
  } else if (spent.totalSpent.minutes > 1) {
    totalSpentString += `${spent.totalSpent.minutes}mins`;
  }

  return { spent, afternoonSpentString, morningSpentString, totalSpentString };
};
