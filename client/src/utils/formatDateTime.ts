export const formatDateTime = (added: string | Date) => {
  const date = new Date(added);
  const format = {
    date: date.toDateString(),
    time: date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };

  return format;
};
