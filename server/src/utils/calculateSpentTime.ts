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
  // const date = new Date();
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

  return spent;
};

export function addTimeStrings(time1: string, time2: string) {
  const timeToMinutes = (time: string) => {
    const regex = /^((\d+)day(s)?)? ?((\d+)hr(s)?)? ?((\d+)min(s)?)?$/;
    const match = time.match(regex);

    if (match) {
      const days = match[2] ? parseInt(match[2]) : 0;
      const hrs = match[5] ? parseInt(match[5]) : 0;
      const mins = match[8] ? parseInt(match[8]) : 0;
      return days * 24 * 60 + hrs * 60 + mins;
    } else {
      throw new Error(
        `Invalid time format: ${time}. Expected format: "XXdays XXhrs XXmins".`
      );
    }
  };

  const minutesToTime = (minutes: number) => {
    const days = Math.floor(minutes / (24 * 60));
    minutes %= 24 * 60;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    let timeString = "";
    if (days > 0) {
      timeString += `${days}day${days > 1 ? "s" : ""}`;
    }
    if (hrs > 0) {
      if (timeString) {
        timeString += " ";
      }
      timeString += `${hrs}hr${hrs > 1 ? "s" : ""}`;
    }
    if (mins > 0) {
      if (timeString) {
        timeString += " ";
      }
      timeString += `${mins}min${mins > 1 ? "s" : ""}`;
    }

    return timeString;
  };

  try {
    const minutes1 = timeToMinutes(time1);
    const minutes2 = timeToMinutes(time2);
    const totalMinutes = minutes1 + minutes2;

    return minutesToTime(totalMinutes);
  } catch (error) {
    console.error(error.message);
    return ""; // Return an empty string or appropriate value if there's an error.
  }
}
