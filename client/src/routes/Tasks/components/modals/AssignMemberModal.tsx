import { Modal, Autocomplete, Button, Text, Group, Box } from "@mantine/core";
import { tasks } from "../../../../data/tasks";
import { members } from "../../../../data/members";
import { useGetAllTraineeQuery } from "../../../../features/api/trainee/traineeApiSlice";
import { useAppSelector } from "../../../../app/hooks";
interface ModalProps {
  assign: boolean;
  toggle: () => void;
}

const AssignMemberModal = ({ assign, toggle }: ModalProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);
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
            Header Page
          </Text>
        </Group>
        <Autocomplete
          // value={assignedTo}
          // onChange={setAssignTo}
          data={trainees!.map((member) => member.name!)}
          dropdownPosition="bottom"
          placeholder="Pick one"
        />

        <Button fullWidth>Assign</Button>
      </div>
    </Modal>
  );
};

export default AssignMemberModal;
