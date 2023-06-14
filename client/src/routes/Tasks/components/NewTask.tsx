import { Card, Group, Text, Button, Box } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { ITask } from "../../../interfaces/task.interface";
// import { tasks } from "../../../data/tasks";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
interface Props {
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const NewTask = ({ toggle, setViewId }: Props) => {
  const { data: tasks } = useGetAllTasksQuery();
  const newTasks: ITask[] = tasks!.filter((task) => task.status === "new");

  return (
    <div className="space-y-3">
      {newTasks.map((task) => (
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
            <Box>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Ticket:</Text>
                <Text>{task.ticketno}</Text>
              </Group>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Added:</Text>
                <Text>{task.started}</Text>
              </Group>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Deliverable:</Text>
                <Text c="blue" fw="bold">
                  View
                </Text>
              </Group>
            </Box>
            <Button size="xs">Start the task</Button>
          </Box>
        </Card>
      ))}
    </div>
  );
};

export default NewTask;
