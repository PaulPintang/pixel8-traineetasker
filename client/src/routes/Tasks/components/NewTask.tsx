import { Card, Group, Text, Box, Flex } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { reset } from "../../../features/notif/notificationSlice";
import { IconMessage } from "@tabler/icons-react";
import {
  useGetNotificationQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from "../../../features/api/notification/notificationApiSlice";
import { ITask } from "../../../interfaces/task.interface";
interface Props {
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const NewTask = ({ toggle, setViewId }: Props) => {
  const dispatch = useAppDispatch();
  const { taskOnNotif } = useAppSelector((state) => state.notif);
  const { data: tasks } = useGetAllTasksQuery();
  const { data: notifications } = useGetNotificationQuery();
  const [readAllNotification] = useReadAllNotificationMutation();
  const { user } = useAppSelector((state) => state.auth);
  const newTasks = tasks?.filter(
    (task) => task.status === "new" && task.assign === user?.name
  );

  const onClickCard = (task: ITask) => {
    toggle();
    setViewId(task._id!);
    dispatch(reset());
    const notif = notifications?.find(
      (notif) => notif.task === taskOnNotif || notif.task === task.taskname
    );
    if (notif) {
      readAllNotification({ task: task.taskname! });
    }
  };

  return (
    <div className="space-y-3">
      {newTasks?.map((task) => {
        const newcomment = notifications?.filter(
          (notif) => notif.task === task.taskname && notif.type === "comment"
        );
        return (
          <Card
            key={task._id}
            className={`cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all ${
              task.taskname === taskOnNotif
                ? "animate-recording shadow-xl "
                : ""
            }`}
            onClick={() => onClickCard(task)}
          >
            <Flex justify="space-between" align="center">
              <div className="bg-indigo-300 w-8 h-1"></div>
              {task.comments?.length ?? 0 !== 0 ? (
                <Group spacing={6}>
                  <IconMessage size={17} className="text-gray-500" />
                  <Text fz="xs" c="dimmed">
                    {task.comments?.length}
                  </Text>
                </Group>
              ) : null}
            </Flex>
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
              {newcomment?.length !== 0 && (
                <Text className="text-blue-500 animate-pulse" fz="xs">
                  + {newcomment?.length} new comment
                </Text>
              )}
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
