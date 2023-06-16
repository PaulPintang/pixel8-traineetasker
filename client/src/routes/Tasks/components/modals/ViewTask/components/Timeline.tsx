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
import { formatDateTime } from "../../../../../../utils/formatDateTime";

const TimelineComponent = ({ user, task, assign }: Props) => {
  const added = formatDateTime(task?.createdAt!);
  const started = formatDateTime(task?.timeline?.startedAt!);
  const done = formatDateTime(task?.timeline?.doneAt!);
  const completed = formatDateTime(task?.timeline?.completedAt!);
  const revision = task.timeline?.revisions.length !== 0;
  return (
    <Timeline active={0} bulletSize={20} lineWidth={3} pt={10} color="cyan">
      {task.timeline?.completedAt ? (
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
            {`${completed.date} at ${completed.time}`}
          </Text>
        </Timeline.Item>
      ) : null}

      {revision ? (
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
          {task.status !== "completed" && (
            <Text color="dimmed" size="xs">
              Ongoing for revision
            </Text>
          )}
          <Group spacing={10}>
            <Text color="dimmed" size="xs">
              Revisions
            </Text>
            <Badge size="sm" color="red" variant="light" className="lowercase">
              x{task.timeline?.revisions.length}
            </Badge>
          </Group>
          {task.timeline?.revisions.map((item, index) => {
            const dates = formatDateTime(item);
            const color =
              index === 0 && task.status === "completed"
                ? "green"
                : index === 0 && task.status === "inprogress"
                ? "indigo"
                : index === 0 && task.status === "forqa"
                ? "yellow"
                : "red";
            return (
              <List
                pt={10}
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color={color} size="xs" radius="xl">
                    <IconCircleX size="1rem" />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Text size="xs" mt={4}>
                    {`${dates.date} at ${dates.time}`}
                  </Text>
                </List.Item>
              </List>
            );
          })}
        </Timeline.Item>
      ) : null}

      {task.timeline?.doneAt ? (
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
            {`${done.date} at ${done.time}`}
          </Text>
        </Timeline.Item>
      ) : null}

      {task.timeline?.startedAt ? (
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
            {task.assign === user.name ? "You" : task.assign}
            <span className="text-gray-500 font-normal pl-1">
              start this task
            </span>
          </Text>
          <Text size="xs" mt={4}>
            {`${started.date} at ${started.time}`}
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
          {user.role === "supervisor" ? "You" : "Supervisor"}
          <span className="text-gray-500 font-normal pl-1">
            added this task
          </span>
        </Text>
        <Text size="xs" mt={4}>
          {`${added.date} at ${added.time}`}
        </Text>
      </Timeline.Item>
    </Timeline>
  );
};

export default TimelineComponent;
