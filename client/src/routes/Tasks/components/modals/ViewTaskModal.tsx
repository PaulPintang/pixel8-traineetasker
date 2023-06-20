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
  Badge,
} from "@mantine/core";
import avatar from "../../../../assets/avatar.png";
import {
  IconChecks,
  IconExclamationCircle,
  IconMessage,
  IconSend,
} from "@tabler/icons-react";
// import { tasks } from "../../../../data/tasks";
import {
  useCommentOnTaskMutation,
  useGetAllTasksQuery,
  useTaskStatusMutation,
} from "../../../../features/api/task/taskApiSlice";
import { ITask } from "../../../../interfaces/task.interface";
import { IconUser } from "@tabler/icons-react";
import { useGetAllTraineeQuery } from "../../../../features/api/trainee/traineeApiSlice";
import Comments from "./ViewTask/components/Comments";
import { useAppSelector } from "../../../../app/hooks";
import { useRef, useState } from "react";
import TimelineComponent from "./ViewTask/components/Timeline";
import { socket } from "../../../../utils/socketConnect";
import { JoinRoom } from "../../../../utils/socketConnect";

interface ModalProps {
  viewId: string | null;
  view: boolean;
  tasks: ITask[] | undefined;
  toggle: () => void;
}

const ViewTaskModal = ({ view, viewId, toggle }: ModalProps) => {
  const { data: tasks } = useGetAllTasksQuery();
  const fail = useRef<HTMLButtonElement>(null);
  const complete = useRef<HTMLButtonElement>(null);
  const msg = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const task = tasks?.find((task) => task._id === viewId);
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);
  const [taskStatus, taskState] = useTaskStatusMutation();
  const [comment, commentState] = useCommentOnTaskMutation();
  const assign = trainees?.find((trainee) => trainee.name === task?.assign);

  // ? TRAINEE
  const handleTaskStatus = async () => {
    const status =
      task?.status === "new"
        ? "inprogress"
        : task?.status === "inprogress"
        ? "forqa"
        : task?.status === "failed" && "inprogress";
    const data: any = {
      _id: task?._id,
      status,
    };
    await taskStatus({ task: data, rooms: [user?.course] });
  };

  // ? SUPERVISOR
  const handleCheckTask = async (status: "completed" | "failed") => {
    const data = { _id: task?._id, status };
    await taskStatus({ task: data, rooms: [user?.course] });
  };

  const addComment = async () => {
    const data = {
      _id: task?._id,
      msg: msg.current?.value,
      by: user?.name,
    };
    await comment(data);
    socket.emit("comment", { data, rooms: [user?.course] });
    msg.current!.value = "";
  };
  return (
    <Modal
      size="sm"
      opened={view}
      onClose={toggle}
      title={
        <Breadcrumbs className="text-xs text-gray-500">
          <Text>Tasks</Text>
          <Text>{task?.taskname}</Text>
          <Text c="dark" className="capitalize">
            {task?.status}
          </Text>
        </Breadcrumbs>
      }
    >
      <div className="px-1">
        <Group position="apart" pb={15}>
          <Title order={4} c="dark">
            {task?.taskname}
          </Title>
          {task?.status === "new" &&
          user?.role !== "supervisor" &&
          user?.role !== "admin" &&
          user?.role !== "trainee" ? (
            <Button
              onClick={toggle}
              leftIcon={<IconUser size={16} />}
              variant="white"
              color={task.assign ? "indigo" : "cyan"}
              size="xs"
            >
              {task.assign ? "Reassign" : "Assign"}
            </Button>
          ) : task?.status === "new" && user?.role === "trainee" ? (
            <Button
              color="indigo"
              size="xs"
              onClick={handleTaskStatus}
              loading={taskState.isLoading}
            >
              Start task
            </Button>
          ) : task?.status === "forqa" && user?.role === "QA Personnel" ? (
            <Group spacing={10}>
              <Tooltip
                withArrow
                color="cyan"
                position="bottom"
                label={<Text fz="xs">mark as completed</Text>}
              >
                <ActionIcon
                  ref={complete}
                  color="cyan"
                  id="complete"
                  onClick={() => {
                    setStatus("complete");
                    handleCheckTask("completed");
                  }}
                  loading={
                    taskState.isLoading && status === "complete" ? true : false
                  }
                >
                  <IconChecks size={20} />
                </ActionIcon>
              </Tooltip>
              <Tooltip
                withArrow
                color="red"
                position="bottom"
                label={<Text fz="xs">mark as failed</Text>}
              >
                <ActionIcon
                  color="red"
                  ref={fail}
                  id="fail"
                  onClick={() => {
                    setStatus("failed");
                    handleCheckTask("failed");
                  }}
                  loading={
                    taskState.isLoading && status === "failed" ? true : false
                  }
                >
                  <IconExclamationCircle size={20} />
                </ActionIcon>
              </Tooltip>
            </Group>
          ) : task?.status === "failed" && user?.role === "trainee" ? (
            <Button
              color="cyan"
              size="xs"
              onClick={handleTaskStatus}
              loading={taskState.isLoading}
            >
              Revise
            </Button>
          ) : (
            task?.status === "inprogress" &&
            task.assign === user?.name &&
            user?.role === "trainee" && (
              <Button
                color="teal"
                size="xs"
                onClick={handleTaskStatus}
                loading={taskState.isLoading}
              >
                Done task
              </Button>
            )
          )}
        </Group>
        <div className="space-y-2">
          {task?.status !== "new" || task.assign ? (
            <Group align="flex-start">
              <Text className="w-1/4" c="dimmed" fz="sm">
                Assign
              </Text>
              <Group spacing={10}>
                <Image
                  src={assign?.picture}
                  width={20}
                  radius="xl"
                  imageProps={{ referrerPolicy: "no-referrer" }}
                />
                <Text fz="sm">{task?.assign}</Text>
              </Group>
            </Group>
          ) : (
            ""
          )}
          <Group align="flex-start">
            <Text className="w-1/4" c="dimmed" fz="sm">
              Ticket No.
            </Text>
            <Text fz="sm">{task?.ticketno}</Text>
          </Group>
          <Group align="flex-start">
            <Text className="w-1/4" c="dimmed" fz="sm">
              Status
            </Text>
            <Text fz="sm">
              {task?.status === "inprogress" ? (
                <Badge variant="filled" color="violet" size="sm">
                  {task?.status}
                </Badge>
              ) : task?.status === "forqa" ? (
                <Badge variant="filled" color="yellow" size="sm">
                  {task?.status}
                </Badge>
              ) : task?.status === "completed" ? (
                <Badge variant="filled" color="green" size="sm">
                  {task?.status}
                </Badge>
              ) : task?.status === "failed" ? (
                <Badge variant="filled" color="red" size="sm">
                  {task?.status}
                </Badge>
              ) : (
                <Badge variant="filled" color="blue" size="sm">
                  {task?.status}
                </Badge>
              )}
            </Text>
          </Group>
        </div>

        <Tabs defaultValue="second" pt={10} color="cyan">
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
              <Image
                src={user?.picture}
                width={20}
                radius="xl"
                imageProps={{ referrerPolicy: "no-referrer" }}
              />
              <Text c="dimmed" fw="bold" fz="xs">
                Your comment
              </Text>
            </Group>
            <Flex gap={5}>
              <Textarea
                ref={msg!}
                className="w-full"
                placeholder="Add your comment"
                autosize
                maxRows={2}
                size="xs"
                spellCheck="false"
              />
              <ActionIcon
                color="cyan"
                variant="white"
                size="lg"
                onClick={addComment}
                loading={commentState.isLoading}
              >
                <IconSend size={19} />
              </ActionIcon>
            </Flex>
            <Comments task={task!} user={user!} assign={assign?.picture!} />
          </Tabs.Panel>
          <Tabs.Panel value="second" className="space-y-2">
            <TimelineComponent
              task={task!}
              user={user!}
              assign={assign?.picture!}
            />
          </Tabs.Panel>
        </Tabs>
      </div>
    </Modal>
  );
};

export default ViewTaskModal;
