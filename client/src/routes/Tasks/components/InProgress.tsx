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
import { tasks } from "../../../data/tasks";
import { ITask } from "../../../interfaces/task.interface";
interface Props {
  setViewId: Dispatch<SetStateAction<string | number | null>>;
  toggle: () => void;
}

const InProgress = ({ toggle, setViewId }: Props) => {
  const inprogress: ITask[] = tasks.filter(
    (task) => task.status === "inprogress"
  );
  return (
    <div className="space-y-3">
      {inprogress.map((task) => (
        <Card
          className="cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all"
          onClick={() => {
            toggle();
            setViewId(task.id!);
          }}
        >
          <div className="bg-violet-300 w-8 h-1"></div>
          <Box pt={15} className="space-y-1">
            <Text fw="bold" c="dark" fz="sm">
              {task.taskname}
            </Text>
            <Badge variant="filled" color="violet" size="sm">
              in-progress
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
                <Text>Assigned to:</Text>
                <Text className="font-semibold">Paul Justine Pintang</Text>
              </Group>
            </Box>
          </Box>
        </Card>
      ))}
    </div>
  );
};

export default InProgress;
