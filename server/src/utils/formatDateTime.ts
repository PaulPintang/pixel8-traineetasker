import { format } from "date-fns";

export const formatDateTime = () => {
  const currentDateTime = new Date();

  const formattedDate = format(currentDateTime, "EEE MMM d yyyy");
  const formattedTime = format(currentDateTime, "hh:mm a");

  return { date: formattedDate, time: formattedTime };
};

// ** im expecting that theres no 1day on daily timesheet spent....
export const handleTimeCarryOver = (
  totalHours: number,
  totalMinutes: number
) => {
  let newSpent = "";

  if (totalMinutes >= 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes %= 60;
  }

  if (totalHours !== 0) {
    newSpent += `${totalHours}hr${totalHours !== 1 ? "s" : ""}`;
  }

  if (totalMinutes !== 0) {
    newSpent += `${totalMinutes}min${totalMinutes !== 1 ? "s" : ""}`;
  }

  return newSpent;
};
