import { Modal, Autocomplete, Button, Text, Group, Box } from "@mantine/core";
import { tasks } from "../../routes/Dashboard/components/TaskTableCard";

const AssignTaskModal = () => {
  return (
    <Modal
      size="sm"
      opened={false}
      onClose={() => console.log("")}
      title="Assign task"
      centered
    >
      <div className="space-y-2">
        <Group spacing={8}>
          <Text fz="sm" className="text-gray-500 font-semibold">
            Trainee:
          </Text>
          <Text fz="sm" c="dimmed">
            Paul Justine Pintang
          </Text>
        </Group>
        <Autocomplete
          // value={assignedTo}
          // onChange={setAssignTo}
          data={tasks.map((task) => task.task)}
          dropdownPosition="bottom"
          placeholder="Pick one"
        />

        <Button fullWidth>Assign</Button>
      </div>
    </Modal>
  );
};

export default AssignTaskModal;
