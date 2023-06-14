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
import { tasks } from "../../../data/tasks";
import { Dispatch, SetStateAction } from "react";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
interface Props {
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const Completed = ({ toggle, setViewId }: Props) => {
  const { data: tasks } = useGetAllTasksQuery();
  const completed = tasks!.filter((task) => task.status === "completed");
  return (
    <div className="space-y-3">
      {completed.map((task) => (
        <Card
          key={task._id}
          className="cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all"
          onClick={() => {
            toggle();
            setViewId(task._id!);
          }}
        >
          <div className="bg-indigo-300 w-8 h-1"></div>
          <Box pt={15} className="space-y-1">
            <Text fw="bold" c="dark" fz="sm">
              {task.taskname}
            </Text>
            <Badge variant="filled" color="green" size="sm">
              Completed
            </Badge>
            <Box>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Ticket:</Text>
                <Text>{task.ticketno}</Text>
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
      ))}
    </div>
  );
};

export default Completed;
