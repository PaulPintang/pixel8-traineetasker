import { Modal, Button, Text, Group, Stack, Flex } from "@mantine/core";
import {
  useAssignTaskMutation,
  useGetAllTasksQuery,
} from "../../../features/api/task/taskApiSlice";
import { useAppSelector } from "../../../app/hooks";
import { useGetAllTraineeQuery } from "../../../features/api/trainee/traineeApiSlice";
import { JoinRoom } from "../../../utils/socketConnect";
import { useState } from "react";
import { ITask } from "../../../interfaces/task.interface";
import ToastNotify from "../../../components/ToastNotify";
import { Notification } from "../../../interfaces/records.interface";
import { usePushNotificationMutation } from "../../../features/api/notification/notificationApiSlice";
interface ModalProps {
  assignTo: string;
  assign: boolean;
  toggle: () => void;
}

const AssignTaskModal = ({ assign, toggle, assignTo }: ModalProps) => {
  const { data: tasks } = useGetAllTasksQuery();
  const [taskId, setTaskId] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const [assignTask, { isLoading }] = useAssignTaskMutation();
  const [pushNotification] = usePushNotificationMutation();

  const handleAssign = async (task: ITask) => {
    setTaskId(task._id!);
    const data = { _id: task._id, name: assignTo, course: user?.course };
    await assignTask({ task: data, rooms: [user?.course] });
    const notification: Notification = {
      task: task?.taskname!,
      type: "task",
      to: assignTo,
      from: {
        name: user?.name!,
        picture: user?.picture!,
      },
      content: `${user?.name} assigned new task for you`,
    };
    await pushNotification({ notification, rooms: [user?.course, "trainee"] });
    ToastNotify(`Task successfully assigned`, "success");
    toggle();
  };
  return (
    <Modal
      size="sm"
      opened={assign}
      onClose={toggle}
      title={
        <Group spacing={8}>
          <Text fz="sm" className="text-gray-500 font-semibold">
            Trainee:
          </Text>
          <Text fz="sm" c="dimmed">
            {assignTo}
          </Text>
        </Group>
      }
      centered
    >
      <div className="space-y-2">
        <Stack spacing={9}>
          <>
            <Text fz="sm" fw="bold">
              Available tasks
            </Text>
            {tasks
              ?.filter((task) => task.status === "new" && task.assign === "")
              .map((task) => (
                <Flex key={task._id} justify="space-between" align="center">
                  <Group spacing={10}>
                    <div className="-space-y-[2px]">
                      <Text size="sm">{task.taskname}</Text>
                      <Text c="dimmed" size="xs">
                        {task.deliverable}
                      </Text>
                    </div>
                  </Group>
                  <Button
                    size="xs"
                    variant="white"
                    onClick={() => handleAssign(task)}
                    loading={isLoading && taskId === task._id}
                  >
                    Assign this task
                  </Button>
                </Flex>
              ))}
            {tasks?.filter(
              (task) => task.status === "new" && task.assign === ""
            ).length === 0 && (
              <Text fz="xs" c="dimmed" fs="italic">
                no available tasks!
              </Text>
            )}
          </>
        </Stack>
      </div>
    </Modal>
  );
};

export default AssignTaskModal;
