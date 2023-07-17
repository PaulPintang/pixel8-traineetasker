import { ITrainee } from "../interfaces/user.interface";

export const taskTotalSpent = (trainee: ITrainee) => {
  const tasksheet = trainee.timesheet.filter(
    (item) => item.status === "recording"
  );

  const totalMorningSpentTime = tasksheet.reduce((total, item) => {
    const morningStart = new Date(`2000/01/01 ${item.morning.start}`);
    const morningEnd = new Date(`2000/01/01 ${item.morning.end}`);
    const morningTimeDiff = Math.abs(
      morningEnd.getTime() - morningStart.getTime()
    );
    const morningHours = Math.floor(morningTimeDiff / 3600000);
    const morningMinutes = Math.floor((morningTimeDiff % 3600000) / 60000);
    return total + morningHours * 60 + morningMinutes;
  }, 0);

  const totalAfternoonSpentTime = tasksheet.reduce((total, item) => {
    const afternoonStart = new Date(`2000/01/01 ${item.afternoon.start}`);
    const afternoonEnd = new Date(`2000/01/01 ${item.afternoon.end}`);
    const afternoonTimeDiff = Math.abs(
      afternoonEnd.getTime() - afternoonStart.getTime()
    );
    const afternoonHours = Math.floor(afternoonTimeDiff / 3600000);
    const afternoonMinutes = Math.floor((afternoonTimeDiff % 3600000) / 60000);
    return total + afternoonHours * 60 + afternoonMinutes;
  }, 0);

  return { totalAfternoonSpentTime, totalMorningSpentTime };
};
