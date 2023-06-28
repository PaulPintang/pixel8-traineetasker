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

  // const morningTimeDiff = Math.abs(
  //   time.morning?.end !== "" ? morningEnd.getTime() - morningStart.getTime() :
  // );
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

  return spent;
};
