import { Card, Group, Text, Box, Badge } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
import { ITask } from "../../../interfaces/task.interface";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { reset } from "../../../features/notif/notificationSlice";
interface Props {
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const Completed = ({ toggle, setViewId }: Props) => {
  const dispatch = useAppDispatch();
  const { taskOnNotif } = useAppSelector((state) => state.notif);
  const { data: tasks } = useGetAllTasksQuery();
  const completed = tasks?.filter((task: ITask) => task.status === "completed");
  return (
    <div className="space-y-3">
      {completed?.map((task) => (
        <Card
          key={task._id}
          className={`cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all ${
            task.taskname === taskOnNotif ? "animate-recording shadow-xl " : ""
          }`}
          onClick={() => {
            toggle();
            setViewId(task._id!);
            dispatch(reset());
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
                <Text>{task.timeline?.createdAt}</Text>
              </Group>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Started:</Text>
                <Text>{task.timeline?.startedAt}</Text>
              </Group>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Completed:</Text>
                <Text>{task.timeline?.completedAt}</Text>
              </Group>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Total spent:</Text>
                <Text fw="bold">{task.spent}</Text>
              </Group>
            </Box>
          </Box>
        </Card>
      ))}

      {completed?.length === 0 && (
        <Text c="dimmed" fs="italic" fz="xs" className="tracking-normal">
          there are no completed tasks!
        </Text>
      )}
    </div>
  );
};

export default Completed;
