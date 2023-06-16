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
import { useRef } from "react";
import TimelineComponent from "./ViewTask/components/Timeline";
import { socket } from "../../../../utils/socketConnect";

interface ModalProps {
  viewId: string | null;
  view: boolean;
  tasks: ITask[] | undefined;
  toggle: () => void;
}

const ViewTaskModal = ({ view, viewId, toggle }: ModalProps) => {
  const fail = useRef<HTMLButtonElement>(null);
  const complete = useRef<HTMLButtonElement>(null);
  const msg = useRef<HTMLTextAreaElement>(null);
  const { data: tasks } = useGetAllTasksQuery();
  const { user } = useAppSelector((state) => state.auth);
  const task = tasks?.find((task) => task._id === viewId);
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);
  const [taskStatus, { isLoading }] = useTaskStatusMutation();
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
    const data = { _id: task?._id, status };
    const response: any = await taskStatus(data);
    socket.emit("status", response.data);
    // ref.current!.value = "";
    // toggle();
  };

  // ? SUPERVISOR
  const handleCheckTask = async (status: "completed" | "failed") => {
    const data = { _id: task?._id, status };
    const response: any = await taskStatus(data);
    socket.emit("status", response.data);
    // toggle();
    // ref.current!.value = "";
  };

  const addComment = async () => {
    const data = {
      _id: task?._id,
      msg: msg.current?.value,
      by: user?.name,
    };
    await comment(data);
    socket.emit("comment", data);
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
          {task?.status === "new" && user?.role === "supervisor" ? (
            <Button
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
              loading={isLoading}
            >
              Start task
            </Button>
          ) : task?.status === "forqa" && user?.role === "supervisor" ? (
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
                  onClick={() => handleCheckTask("completed")}
                  loading={
                    isLoading && complete.current!.id !== "complete"
                      ? true
                      : false
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
                  onClick={() => handleCheckTask("failed")}
                  loading={
                    isLoading && fail.current!.id !== "fail" ? true : false
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
              loading={isLoading}
            >
              Revise
            </Button>
          ) : (
            task?.status === "inprogress" &&
            task.assign === user?.name && (
              <Button
                color="teal"
                size="xs"
                onClick={handleTaskStatus}
                loading={isLoading}
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
