import { Modal, Button, Text, Group, Image, Flex, Stack } from "@mantine/core";
import { useGetAllTraineeQuery } from "../../../../features/api/trainee/traineeApiSlice";
import { useAppSelector } from "../../../../app/hooks";
import { ITask } from "../../../../interfaces/task.interface";
import { useAssignTaskMutation } from "../../../../features/api/task/taskApiSlice";
import { useState } from "react";
import { JoinRoom } from "../../../../utils/socketConnect";
import ToastNotify from "../../../../components/ToastNotify";
interface ModalProps {
  task: ITask;
  assign: boolean;
  toggle: () => void;
}

const AssignMemberModal = ({ task, assign, toggle }: ModalProps) => {
  const [assignTo, setAssignTo] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);
  const [assignTask, { isLoading }] = useAssignTaskMutation();

  const handleAssign = async (name: string) => {
    JoinRoom(user?.course!, user?.role!);
    setAssignTo(name);
    const data = { _id: task._id, name: name, course: user?.course };
    await assignTask({ task: data, rooms: [user?.course] });
    ToastNotify(`Task successfully assigned`, "success");
    toggle();
  };

  return (
    <Modal
      size="md"
      opened={assign}
      onClose={toggle}
      title={
        <Group spacing={8}>
          <Text fz="sm" className="text-gray-500 font-semibold">
            Task:
          </Text>
          <Text fz="sm" c="dimmed">
            {task.taskname}
          </Text>
        </Group>
      }
      centered
    >
      <div className="space-y-2">
        <Stack spacing={9} p={8}>
          <>
            <Text fz="sm" fw="bold">
              Members
            </Text>
            {trainees?.map((account) => (
              <Flex key={account._id} justify="space-between" align="center">
                <Group spacing={10}>
                  <Image
                    src={account.picture}
                    width={35}
                    radius="xl"
                    imageProps={{ referrerPolicy: "no-referrer" }}
                  />
                  <div className="-space-y-[2px]">
                    <Text size="sm">{account.name}</Text>
                    <Text c="dimmed" size="xs">
                      {account.email}
                    </Text>
                  </div>
                </Group>
                <Button
                  size="xs"
                  variant="white"
                  onClick={() => handleAssign(account.name!)}
                  loading={isLoading && assignTo === account.name}
                  disabled={task.assign === account.name}
                >
                  Assign
                </Button>
              </Flex>
            ))}
          </>
        </Stack>
      </div>
    </Modal>
  );
};

export default AssignMemberModal;
