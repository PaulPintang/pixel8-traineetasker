import { parseISO, formatDistanceToNow, format, parse } from "date-fns";
import { enUS } from "date-fns/locale";
import { Text } from "@mantine/core";

type Props = {
  timestamp: string;
};

const TimeAgo = ({ timestamp }: Props) => {
  let timeAgo = "";
  let formattedDate = "";

  // let onNotif = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    // formattedDate = format(date, "EEE MMMM yyyy 'at' hh:mm a");
    timeAgo = `${timePeriod} ago`;
    // onNotif = `${formattedDate} (${timeAgo})`;
  }

  return (
    <Text c="dimmed" fz="xs">
      {timeAgo}
    </Text>
  );
};
export default TimeAgo;
