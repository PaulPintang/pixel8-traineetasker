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
import { IconCheck, IconCircleX } from "@tabler/icons-react";
import { useGetAllAccountQuery } from "../../../../../../features/api/account/accountApiSlice";

const TimelineComponent = ({ user, task, assign }: Props) => {
  const { data: accounts } = useGetAllAccountQuery();
  const revision = task?.timeline?.revisions.length !== 0;

  const failedby = accounts?.find((acc) => acc.role === "QA Personnel");
  const startedby = accounts?.find((acc) => acc.role === "Task manager");

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
            {task.timeline.completedAt}
          </Text>
        </Timeline.Item>
      ) : null}

      {revision ? (
        <Timeline.Item
          title="Task failed - for revision"
          className="text-sm"
          bullet={
            <Avatar
              src={failedby?.picture}
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
          {task.timeline?.revisions
            .slice()
            .sort((a, b) => b.localeCompare(a))
            .map((date, index) => {
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
                  key={index}
                  pt={10}
                  spacing="xs"
                  size="sm"
                  center
                  icon={
                    <ThemeIcon color={color} size="xs" radius="xl">
                      {index === 0 && task.status === "completed" ? (
                        <IconCheck />
                      ) : (
                        <IconCircleX size="1rem" />
                      )}
                    </ThemeIcon>
                  }
                >
                  <List.Item>
                    <Text size="xs" mb={2}>
                      {date}
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
            {task.timeline.doneAt}
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
            {task.timeline?.startedAt}
          </Text>
        </Timeline.Item>
      ) : null}
      <Timeline.Item
        title="Task added"
        className="text-sm"
        bullet={
          <Avatar
            src={startedby?.picture}
            size={20}
            radius="xl"
            imageProps={{ referrerPolicy: "no-referrer" }}
          />
        }
      >
        <Text color="dark" fw="bold" size="xs">
          {user.role === "Task manager" ? "You" : "Task manager"}
          <span className="text-gray-500 font-normal pl-1">
            added this task
          </span>
        </Text>
        <Text size="xs" mt={4}>
          {task.timeline?.createdAt}
        </Text>
      </Timeline.Item>
    </Timeline>
  );
};

export default TimelineComponent;
