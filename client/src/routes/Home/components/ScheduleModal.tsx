import {
  Modal,
  Autocomplete,
  Button,
  Text,
  Group,
  Flex,
  Box,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
interface ModalProps {
  open: boolean;
  toggle: () => void;
}

const ScheduleModal = ({ open, toggle }: ModalProps) => {
  return (
    <Modal
      size="xs"
      opened={open}
      onClose={toggle}
      title="Edit Schedule"
      centered
    >
      <Group grow pb={12}>
        <div>
          <Text c="dimmed" fw="bold" fz="sm">
            Start time
          </Text>
          <TimeInput icon={<IconClock size="1rem" />} />
        </div>
        <div>
          <Text c="dimmed" fw="bold" fz="sm">
            End time
          </Text>
          <TimeInput icon={<IconClock size="1rem" stroke={1.5} />} />
        </div>
      </Group>
      <Button fullWidth>Save</Button>
    </Modal>
  );
};

export default ScheduleModal;
