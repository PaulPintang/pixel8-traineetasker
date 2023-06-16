import { Modal, Autocomplete, Button, Text, Group, Box } from "@mantine/core";
import { tasks } from "../../../../data/tasks";
import { members } from "../../../../data/members";
import { useGetAllTraineeQuery } from "../../../../features/api/trainee/traineeApiSlice";
import { useAppSelector } from "../../../../app/hooks";
import { ITask } from "../../../../interfaces/task.interface";
import {
  useAssignTaskMutation,
  useGetAllTasksQuery,
} from "../../../../features/api/task/taskApiSlice";
import { useState } from "react";
import { socket } from "../../../../features/api/task/taskApiSlice";
import { useEffect } from "react";
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

  const handleAssign = async () => {
    await assignTask({ _id: task._id, name: assignTo });
    toggle();
  };

  return (
    <Modal
      size="sm"
      opened={assign}
      onClose={toggle}
      title="Assign task"
      centered
    >
      <div className="space-y-2">
        <Group spacing={8}>
          <Text fz="sm" className="text-gray-500 font-semibold">
            Task:
          </Text>
          <Text fz="sm" c="dimmed">
            {task.taskname}
          </Text>
        </Group>
        <Autocomplete
          value={assignTo}
          onChange={setAssignTo}
          data={trainees!.map((member) => member.name!)}
          dropdownPosition="bottom"
          placeholder="Pick one"
        />

        <Button onClick={handleAssign} loading={isLoading} fullWidth>
          Assign
        </Button>
      </div>
    </Modal>
  );
};

export default AssignMemberModal;
