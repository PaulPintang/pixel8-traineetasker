import {
  Card,
  Group,
  Text,
  Button,
  Box,
  Badge,
  ActionIcon,
  Tooltip,
  Flex,
} from "@mantine/core";
import { IconChecks, IconExternalLink } from "@tabler/icons-react";

interface Props {
  toggle: () => void;
}

const InProgress = ({ toggle }: Props) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-xl rounded-md shadow-md"
      onClick={toggle}
    >
      <div className="bg-indigo-300 w-8 h-1"></div>
      <Box pt={15} className="space-y-1">
        <Text fw="bold" c="dark" fz="sm">
          Dashboard Page
        </Text>
        <Badge variant="filled" color="violet" size="sm">
          in-progress
        </Badge>
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
            <Text>Started:</Text>
            <Text>Wednesday, June 07 2023</Text>
          </Group>
          <Group className="text-gray-500" fz="xs" spacing={8}>
            <Text>Assigned to:</Text>
            <Text className="font-semibold">Paul Justine Pintang</Text>
          </Group>
        </Box>
        {/* <Flex gap={10}>
          <Tooltip
            label={<small>View</small>}
            withArrow
            color="indigo"
            position="bottom"
            py={2}
          >
            <ActionIcon color="indigo">
              <IconExternalLink />
            </ActionIcon>
          </Tooltip>

          <Tooltip
            label={<small>Mark as completed!</small>}
            withArrow
            color="green"
            position="bottom"
            py={2}
          >
            <ActionIcon color="teal">
              <IconChecks />
            </ActionIcon>
          </Tooltip>
        </Flex> */}
      </Box>
    </Card>
  );
};

export default InProgress;
