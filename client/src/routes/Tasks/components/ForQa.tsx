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
import { Dispatch, SetStateAction } from "react";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
interface Props {
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const ForQa = ({ toggle, setViewId }: Props) => {
  const { data: tasks } = useGetAllTasksQuery();
  const forqa = tasks?.filter((task) => task.status === "forqa");
  return (
    <div className="space-y-3">
      {forqa?.map((task) => (
        <Card
          key={task._id}
          className="cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all"
          onClick={() => {
            toggle();
            setViewId(task._id!);
          }}
        >
          <div className="bg-yellow-300 w-8 h-1"></div>
          <Box pt={15} className="space-y-1">
            <Text fw="bold" c="dark" fz="sm">
              {task.taskname}
            </Text>
            <Badge variant="filled" color="yellow" size="sm">
              for qa
            </Badge>
            {task.timeline?.revisions.length !== 0 && (
              <Group className="text-gray-500" spacing={10}>
                <Text size="xs">Revisions</Text>
                <Badge
                  size="sm"
                  color="red"
                  variant="light"
                  className="lowercase"
                >
                  x{task.timeline?.revisions.length}
                </Badge>
              </Group>
            )}
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
                <Text>Spent:</Text>
                <Text>8hrs30min</Text>
              </Group>
            </Box>
          </Box>
        </Card>
      ))}
    </div>
  );
};

export default ForQa;
