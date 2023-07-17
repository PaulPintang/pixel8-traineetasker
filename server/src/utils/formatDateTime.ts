export const formatDateTime = () => {
  const datetime = new Date(new Date().toISOString());
  const formattedDate = datetime.toDateString();
  const formattedTime = datetime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { date: formattedDate, time: formattedTime };
};

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
