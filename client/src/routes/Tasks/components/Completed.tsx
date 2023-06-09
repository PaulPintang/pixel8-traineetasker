import {
  Card,
  Group,
  Text,
  Button,
  Box,
  Badge,
  ActionIcon,
  Tooltip,
  Flex,
} from "@mantine/core";
import { IconChecks, IconExternalLink } from "@tabler/icons-react";
interface Props {
  toggle: () => void;
}

const Completed = ({ toggle }: Props) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-xl rounded-md shadow-md"
      onClick={toggle}
    >
      <div className="bg-indigo-300 w-8 h-1"></div>
      <Box pt={15} className="space-y-1">
        <Text fw="bold" c="dark" fz="sm">
          Notification system
        </Text>
        <Badge variant="filled" color="green" size="sm">
          Completed
        </Badge>
        <Box>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Ticket:</Text>
            <Text>143423423234</Text>
          </Group>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Added:</Text>
            <Text>Wednesday, June 07 2023</Text>
          </Group>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Started:</Text>
            <Text>Wednesday, June 07 2023</Text>
          </Group>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Completed:</Text>
            <Text>Wednesday, June 07 2023</Text>
          </Group>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Spent:</Text>
            <Text>8hrs20min</Text>
          </Group>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Comment:</Text>
            <Text>Good job!</Text>
          </Group>
        </Box>
      </Box>
    </Card>
  );
};

export default Completed;
