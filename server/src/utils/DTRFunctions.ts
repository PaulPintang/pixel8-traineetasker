import { formatDateTime } from "./formatDateTime";
import { IDtr } from "../interfaces/records.interface";
import { ITrainee } from "../interfaces/user.interface";
import { ITask } from "../interfaces/task.interface";
import { calculateSpentTime } from "./calculateSpentTime";

interface MorningTimeInOut {
  trainee: ITrainee;
  taskInprogress: ITask;
  recording: number;
  day: "morning" | "afternoon";
}

export const handleTaskSpent = ({
  trainee,
  taskInprogress,
  recording,
  day,
}: MorningTimeInOut) => {
  const format = formatDateTime();

  if (day === "morning") {
    trainee.timesheet[recording].morning.end = format.time;
  } else {
    trainee.timesheet[recording].afternoon.end = format.time;
    trainee.timesheet[recording].status = "recorded";
  }
  // Extract existing hours and minutes from the existing spent time in the database
  const hoursMatch = taskInprogress.spent.match(/(\d+)hr/);
  const minutesMatch = taskInprogress.spent.match(/(\d+)mins?/);

  const existingHours = hoursMatch ? hoursMatch[1] : "0";
  const existingMinutes = minutesMatch ? minutesMatch[1] : "0";

  const time = {
    status: trainee.timesheet[recording].status,
    morning: trainee.timesheet[recording].morning,
    afternoon: trainee.timesheet[recording].afternoon,
  };
  const spent = calculateSpentTime(time);

  return {
    spent,
    existingHours,
    existingMinutes,
  };
};

export const handleTraineeHourSpent = (
  trainee: ITrainee,
  day: "morning" | "afternoon"
) => {
  const format = formatDateTime();

  const index = trainee.dtr.findIndex((record) => record.date === format.date);

  if (day === "morning") {
    // trainee.dtr[index].morning.out = "12:00 PM";
    trainee.dtr[index].morning.out = format.time;
  } else {
    trainee.dtr[index].afternoon.out = format.time;
    // trainee.dtr[index].afternoon.out = "05:00 PM";
    trainee.dtr[index].status = "recorded";
  }
  const startHour = trainee.dtr[index].morning.in.split(":")[0];
  const endHour = trainee.dtr[index].morning.out.split(":")[0];
  const startTime = new Date();
  const endTime = new Date();
  startTime.setHours(parseInt(startHour, 10), 0, 0); // Set start time to 8:00 AM
  endTime.setHours(parseInt(endHour, 10), 0, 0); // Set end time to 12:00 PM
  const timeDiff = Math.abs(endTime.getTime() - startTime.getTime()); // Get the time difference in milliseconds
  const hoursSpent = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
  const hours = {
    rendered: trainee.hours.rendered + hoursSpent,
    pending: trainee.hours.pending - hoursSpent,
  };

  return hours;
};
