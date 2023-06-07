import { Card, Group, Text, Button, Box } from "@mantine/core";

const NewTask = () => {
  return (
    <Card className="h- rounded-md shadow-md">
      <div className="bg-indigo-300 w-8 h-1"></div>
      <Box pt={15} className="space-y-1">
        <Text fw="bold" c="dark" fz="sm">
          Backend Setup
        </Text>
        <Box>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Ticket:</Text>
            <Text>143423423234</Text>
          </Group>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Added:</Text>
            <Text>Wednesday, June 07 2023</Text>
          </Group>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Deliverable:</Text>
            <Text c="blue" fw="bold">
              View
            </Text>
          </Group>
        </Box>
        <Button size="xs">Start the task</Button>
      </Box>
    </Card>
  );
};

export default NewTask;
