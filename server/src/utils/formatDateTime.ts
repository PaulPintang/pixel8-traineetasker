export const formatDateTime = (added: string | Date) => {
  const date = new Date(added);
  const format = {
    date: date.toDateString(),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };

  return format;
};
