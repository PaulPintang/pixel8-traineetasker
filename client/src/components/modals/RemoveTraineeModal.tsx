import { Modal, Title, Text, Flex, Button, TextInput } from "@mantine/core";

const RemoveTraineeModal = () => {
  return (
    <Modal
      opened={false}
      onClose={() => console.log("")}
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
        <TextInput
          size="sm"
          //   value={typeDelete}
          //   onChange={(e) => setType(e.target.value)}
          autoFocus
        />
        <Flex gap={10} pt={10}>
          <Button variant="light" color="gray" fullWidth>
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
