import { Card, Group, Text, Box } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { reset } from "../../../features/notif/notificationSlice";
interface Props {
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const NewTask = ({ toggle, setViewId }: Props) => {
  const dispatch = useAppDispatch();
  const { taskOnNotif } = useAppSelector((state) => state.notif);
  const { data: tasks } = useGetAllTasksQuery();
  const { user } = useAppSelector((state) => state.auth);
  const newTasks = tasks?.filter(
    (task) => task.status === "new" && task.assign === user?.name
  );

  return (
    <div className="space-y-3">
      {newTasks?.map((task) => {
        return (
          <Card
            key={task._id}
            className={`cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all ${
              task.taskname === taskOnNotif
                ? "animate-recording shadow-xl "
                : ""
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
              <div>
                <Group className="text-gray-500" fz="xs" spacing={8}>
                  <Text>Ticket:</Text>
                  <Text>{task.ticketno}</Text>
                </Group>
                <Group className="text-gray-500" fz="xs" spacing={8}>
                  <Text>Added:</Text>
                  <Text>{task.timeline?.createdAt}</Text>
                </Group>
              </div>
            </Box>
          </Card>
        );
      })}

      {newTasks?.length === 0 && (
        <Text c="dimmed" fs="italic" fz="xs" className="tracking-normal">
          there are no new tasks!
        </Text>
      )}
    </div>
  );
};

export default NewTask;
