import { format } from "date-fns";

export const formatDateTime = () => {
  const currentDateTime = new Date();

  const formattedDate = format(currentDateTime, "EEE MMM d yyyy");
  const formattedTime = format(currentDateTime, "hh:mm a");

  return { date: formattedDate, time: formattedTime };
};
