import { parseISO, formatDistanceToNow } from "date-fns";
import { Text } from "@mantine/core";

type Props = {
  timestamp: string;
};

const TimeAgo = ({ timestamp }: Props) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <Text c="dimmed" fz="xs">
      {timeAgo}
    </Text>
  );
};
export default TimeAgo;
