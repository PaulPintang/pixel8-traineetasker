export const checkTime = () => {
  const currentHour = new Date().getHours();
  let timeOfDay: "morning" | "afternoon" | null = null;

  if (currentHour >= 0 && currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "afternoon";
  }

  return timeOfDay;
};
