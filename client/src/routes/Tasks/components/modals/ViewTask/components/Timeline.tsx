import {
  Timeline,
  Text,
  Avatar,
  Group,
  Badge,
  List,
  ThemeIcon,
} from "@mantine/core";
import { Props } from "./Comments";
import { IconCheck, IconCircleDashed, IconCircleX } from "@tabler/icons-react";
import { IconCircleCheck } from "@tabler/icons-react";

const TimelineComponent = ({ user, task, assign }: Props) => {
  const revision = true;
  return (
    <Timeline active={0} bulletSize={20} lineWidth={3} pt={10} color="cyan">
      {task.status === "completed" ? (
        <Timeline.Item
          title="Task Completed"
          className="text-sm"
          color="green"
          bullet={<IconCheck size={14} />}
        >
          <Text color="dimmed" size="xs">
            You've mark this task as completed
          </Text>
          <Text size="xs" mt={4}>
            Friday, June 7 2023 at 11:53 AM
          </Text>
        </Timeline.Item>
      ) : null}

      {task.status === "forqa" ||
      task.status === "failed" ||
      task.status === "completed"
        ? revision && (
            <Timeline.Item
              title="Task failed - for revision"
              className="text-sm"
              bullet={
                <Avatar
                  src={user.picture}
                  size={20}
                  radius="xl"
                  imageProps={{ referrerPolicy: "no-referrer" }}
                />
              }
            >
              <Group spacing={10}>
                <Text color="dimmed" size="xs">
                  Revisions
                </Text>
                <Badge
                  size="sm"
                  color="red"
                  variant="light"
                  className="lowercase"
                >
                  x3
                </Badge>
              </Group>
              <List
                pt={10}
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="red" size="xs" radius="xl">
                    <IconCircleX size="1rem" />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Text size="xs" mt={4}>
                    Tuesday, June 8 2023 at 8:53 AM
                  </Text>
                </List.Item>
                <List.Item>
                  <Text size="xs" mt={4}>
                    Monday, June 7 2023 at 11:53 AM
                  </Text>
                </List.Item>
                <List.Item>
                  <Text size="xs" mt={4}>
                    Wednesday, June 7 2023 at 11:53 AM
                  </Text>
                </List.Item>
              </List>
            </Timeline.Item>
          )
        : null}

      {task.status === "forqa" ||
      task.status === "completed" ||
      task.status === "failed" ? (
        <Timeline.Item
          title="Mark as done"
          className="text-sm"
          bullet={
            <Avatar
              src={assign}
              size={20}
              radius="xl"
              imageProps={{ referrerPolicy: "no-referrer" }}
            />
          }
        >
          <Text color="dimmed" size="xs">
            Task for-QA
          </Text>
          <Text size="xs" mt={4}>
            Friday, June 7 2023 at 11:53 AM
          </Text>
        </Timeline.Item>
      ) : null}

      {task.status === "inprogress" ||
      task.status === "forqa" ||
      task.status === "failed" ||
      task.status === "completed" ? (
        <Timeline.Item
          title="Task in progress"
          lineVariant="dotted"
          className="text-sm"
          bullet={
            <Avatar
              src={assign}
              size={20}
              radius="xl"
              imageProps={{ referrerPolicy: "no-referrer" }}
            />
          }
        >
          <Text color="dark" fw="bold" size="xs">
            Paul Justine Pintang{"  "}
            <span className="text-gray-500 font-normal">start this task</span>
          </Text>
          <Text size="xs" mt={4}>
            Friday, June 7 2023 at 11:53 AM
          </Text>
        </Timeline.Item>
      ) : null}
      <Timeline.Item
        title="Task added"
        className="text-sm"
        bullet={
          <Avatar
            src={user.role === "supervisor" ? user.picture : assign}
            size={20}
            radius="xl"
            imageProps={{ referrerPolicy: "no-referrer" }}
          />
        }
      >
        <Text color="dark" fw="bold" size="xs">
          {user.role === "supervisor" ? "You" : "Supervisor"}{" "}
          <span className="text-gray-500 font-normal">added this task</span>
        </Text>
        <Text size="xs" mt={4}>
          Friday, June 7 2023 at 07:53 AM
        </Text>
      </Timeline.Item>
    </Timeline>
  );
};

export default TimelineComponent;
