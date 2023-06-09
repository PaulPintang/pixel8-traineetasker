import { Modal, Autocomplete, Button, Text, Group, Box } from "@mantine/core";
import { tasks } from "../../../Dashboard/components/TaskTableCard";
import { members } from "../../../Dashboard/components/MembersTableCard";

interface ModalProps {
  assign: boolean;
  toggle: () => void;
}

const AssignMemeberModal = ({ assign, toggle }: ModalProps) => {
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
          data={members.map((member) => member.name)}
          dropdownPosition="bottom"
          placeholder="Pick one"
        />

        <Button fullWidth>Assign</Button>
      </div>
    </Modal>
  );
};

export default AssignMemeberModal;
