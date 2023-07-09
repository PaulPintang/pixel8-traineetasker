import { Modal, Title, Text, Flex, Button, TextInput } from "@mantine/core";

interface ModalProps {
  remove: boolean;
  toggle: () => void;
}

const RemoveTraineeModal = ({ remove, toggle }: ModalProps) => {
  return (
    <Modal
      opened={remove}
      onClose={toggle}
      size="xs"
      centered
      withCloseButton={false}
    >
      <div className="space-y-2">
        <Title order={4}>Remove trainee</Title>
        <Text c="dimmed" fz="sm">
          Are you sure you want to remove this trainee? This action cannot be
          undone.
        </Text>
        <Text fz="sm" fw={700}>
          Type "remove" to confirm your action
        </Text>
        <TextInput size="sm" autoFocus />
        <Flex gap={10} pt={10}>
          <Button onClick={toggle} variant="light" color="gray" fullWidth>
            Cancel
          </Button>
          <Button
            // onClick={onDelete}
            color="red"
            fullWidth
            // disabled={typeDelete !== "delete" && true}
            // loading={isLoading}
          >
            Remove trainee
          </Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default RemoveTraineeModal;
