import {
  Modal,
  Text,
  Group,
  Flex,
  Menu,
  Timeline,
  Tabs,
  Image,
  Breadcrumbs,
  Title,
  Button,
  TextInput,
  ActionIcon,
  Textarea,
  Paper,
  Tooltip,
  Avatar,
} from "@mantine/core";
import avatar from "../../../../assets/avatar.png";
import {
  IconChecks,
  IconExclamationCircle,
  IconMessage,
  IconSend,
} from "@tabler/icons-react";

interface ModalProps {
  view: boolean;
  toggle: () => void;
}

const ViewTaskModal = ({ view, toggle }: ModalProps) => {
  return (
    <Modal
      size="sm"
      opened={view}
      onClose={toggle}
      title={
        <Breadcrumbs className="text-xs text-gray-500">
          <Text>Tasks</Text>
          <Text>Header page sadas</Text>
          <Text c="dark">In progress</Text>
        </Breadcrumbs>
      }
    >
      <Group position="apart" pb={15}>
        <Title order={4} c="dark">
          Header page
        </Title>
        <Group spacing={10}>
          <Tooltip
            withArrow
            color="cyan"
            position="bottom"
            label={<Text fz="xs">mark as completed</Text>}
          >
            <ActionIcon color="cyan">
              <IconChecks size={20} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            withArrow
            color="red"
            position="bottom"
            label={<Text fz="xs">mark as failed</Text>}
          >
            <ActionIcon color="red">
              <IconExclamationCircle size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <div className="space-y-2">
        <Group align="flex-start">
          <Text className="w-1/4" c="dimmed" fz="sm">
            Assign
          </Text>
          <Group spacing={10}>
            <Image src={avatar} width={20} />
            <Text fz="sm">Paul Justine Pintang</Text>
          </Group>
        </Group>
        <Group align="flex-start">
          <Text className="w-1/4" c="dimmed" fz="sm">
            Ticket No.
          </Text>
          <Text fz="sm">dsada3ewqeqwg</Text>
        </Group>
        <Group align="flex-start">
          <Text className="w-1/4" c="dimmed" fz="sm">
            Status
          </Text>
          <Text fz="sm">In-progress</Text>
        </Group>
      </div>

      <Tabs defaultValue="first" pt={10} color="cyan">
        <Tabs.List>
          <Tabs.Tab className="w-2/4 text-xs" value="first">
            Comments
          </Tabs.Tab>
          <Tabs.Tab className="w-2/4 text-xs" value="second">
            Timeline
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first" className="space-y-2">
          <Group spacing={10} pt={10}>
            <Image src={avatar} width={20} />
            <Text c="dimmed" fw="bold" fz="xs">
              Your comment
            </Text>
          </Group>
          <Flex gap={5}>
            <Textarea
              className="w-full"
              placeholder="Add your comment"
              autosize
              maxRows={2}
              size="xs"
            />
            <ActionIcon color="cyan" variant="white" size="lg">
              <IconSend size={19} />
            </ActionIcon>
          </Flex>
          <section className="space-y-3">
            <Paper component="div" className="bg-slate-50 space-y-2" p={11}>
              <Text fz="xs" c="dark">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus cumque unde
              </Text>
              <Group position="apart">
                <Group spacing={10}>
                  <Image src={avatar} width={20} />
                  <Text fz="xs" fw="bold">
                    Juan Dela Cruz
                  </Text>
                </Group>
                <Text c="dimmed" fz="xs">
                  2 min ago
                </Text>
              </Group>
            </Paper>
            <Paper component="div" className="bg-slate-50 space-y-2" p={11}>
              <Text fz="xs" c="dark">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
              <Group position="apart">
                <Text c="dimmed" fz="xs">
                  8 min ago
                </Text>
                <Group spacing={10}>
                  <Image src={avatar} width={20} />
                  <Text fz="xs" fw="bold">
                    You
                  </Text>
                </Group>
              </Group>
            </Paper>
          </section>
        </Tabs.Panel>
        <Tabs.Panel value="second" className="space-y-2">
          <Timeline
            active={0}
            bulletSize={14}
            lineWidth={3}
            pt={10}
            color="cyan"
          >
            <Timeline.Item title="Task Completed" className="text-sm">
              <Text color="dimmed" size="xs">
                You've mark this task as completed
              </Text>
              <Text size="xs" mt={4}>
                Friday, June 7 2023 at 11:53 AM
              </Text>
            </Timeline.Item>
            <Timeline.Item
              title="Mark as done"
              className="text-sm"
              bullet={<Avatar src={avatar} size={20} radius="xl" />}
            >
              <Text color="dimmed" size="xs">
                Task for-QA
              </Text>
              <Text size="xs" mt={4}>
                Friday, June 7 2023 at 11:53 AM
              </Text>
            </Timeline.Item>
            <Timeline.Item
              title="Task in progress"
              lineVariant="dotted"
              className="text-sm"
              bullet={<Avatar src={avatar} size={20} radius="xl" />}
            >
              <Text color="dark" fw="bold" size="xs">
                Paul Justine Pintang{" "}
                <span className="text-gray-500 font-normal">
                  is doing this task
                </span>
              </Text>
              <Text size="xs" mt={4}>
                Friday, June 7 2023 at 11:53 AM
              </Text>
            </Timeline.Item>
            <Timeline.Item title="Task added" className="text-sm">
              <Text color="dark" fw="bold" size="xs">
                You{" "}
                <span className="text-gray-500 font-normal">
                  added this task
                </span>
              </Text>
              <Text size="xs" mt={4}>
                Friday, June 7 2023 at 07:53 AM
              </Text>
            </Timeline.Item>
          </Timeline>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default ViewTaskModal;
