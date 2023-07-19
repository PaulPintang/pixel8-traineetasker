import {
  Modal,
  Text,
  Group,
  Flex,
  Tabs,
  Image,
  Breadcrumbs,
  Title,
  Button,
  ActionIcon,
  Textarea,
  Tooltip,
  Badge,
  Anchor,
} from "@mantine/core";
import {
  IconChecks,
  IconExclamationCircle,
  IconLink,
  IconMessage,
  IconSend,
} from "@tabler/icons-react";
import {
  useCommentOnTaskMutation,
  useGetAllTasksQuery,
  useTaskStatusMutation,
} from "../../../../features/api/task/taskApiSlice";
import { ITask } from "../../../../interfaces/task.interface";
import {
  useAddTaskTimesheetMutation,
  useGetAllTraineeQuery,
  useGetTraineeProfileQuery,
} from "../../../../features/api/trainee/traineeApiSlice";
import Comments from "./ViewTask/components/Comments";
import { useAppSelector } from "../../../../app/hooks";
import { useRef, useState } from "react";
import TimelineComponent from "./ViewTask/components/Timeline";
import { JoinRoom } from "../../../../utils/socketConnect";
import { ISheets } from "../../../../interfaces/records.interface";
import { useMediaQuery } from "@mantine/hooks";
import { calculateSpentTime } from "../../../../utils/calculateSpentTime";
import ToastNotify from "../../../../components/ToastNotify";

interface ModalProps {
  viewId?: string | null;
  view?: boolean;
  tasks?: ITask[] | undefined;
  toggleView: () => void;
}

const ViewTaskModal = ({ view, viewId, toggleView }: ModalProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)");

  const { data: tasks } = useGetAllTasksQuery();
  const fail = useRef<HTMLButtonElement>(null);
  const complete = useRef<HTMLButtonElement>(null);
  const msg = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const task = tasks?.find((task) => task._id === viewId);
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);
  // const { data: trainee, refetch } = useGetTraineeProfileQuery();
  // const { data: trainee, refetch } = useGetTraineeProfileQuery(user?._id!, {
  //   skip: user?.role !== "trainee",
  // });
  const [taskStatus, taskState] = useTaskStatusMutation();
  const [comment, commentState] = useCommentOnTaskMutation();
  const [timesheet, sheetState] = useAddTaskTimesheetMutation();
  const assign = trainees?.find((trainee) => trainee.name === task?.assign);

  const sheet = trainees?.map((trainee) =>
    trainee?.timesheet?.find((task) => task?.status === "recording")
  );

  const taskSpent = sheet?.find((item) => item !== undefined);

  const time = {
    status: taskSpent?.status,
    morning: taskSpent?.morning,
    afternoon: taskSpent?.afternoon,
  };

  const spent = calculateSpentTime(time);

  // ? TRAINEE
  const handleTaskStatus = async () => {
    JoinRoom(user?.course!, user?.role!);
    const status =
      task?.status === "new" || task?.status === "pending"
        ? "inprogress"
        : task?.status === "inprogress"
        ? "forqa"
        : task?.status === "failed" && "inprogress";
    const data: any = {
      _id: task?._id,
      status,
    };
    await taskStatus({ task: data, rooms: [user?.course] });
    toggleView();
    ToastNotify(`Task status changed to ${status}`, "success");

    if (
      task?.status === "new" ||
      task?.status === "failed" ||
      task?.status === "pending"
    ) {
      const sheet: ISheets = {
        task: task.taskname!,
        ticket: task.ticketno!,
      };
      await timesheet({ sheet, rooms: [user?.course!] });
    }
    // refetch();
  };

  // ? SUPERVISOR
  const handleCheckTask = async (status: "completed" | "failed") => {
    JoinRoom(user?.course!, user?.role!);
    const data = { _id: task?._id, status };
    await taskStatus({ task: data, rooms: [user?.course] });
    toggleView();
    ToastNotify(`Task status changed to ${status}`, "success");
    // refetch();
  };

  const addComment = async () => {
    JoinRoom(user?.course!, user?.role!);
    const message = {
      _id: task?._id,
      msg: msg.current?.value,
      by: user?.name,
    };
    await comment({ msg: message, rooms: [user?.course] });
    msg.current!.value = "";
  };
  return (
    <Modal
      size="sm"
      opened={view!}
      onClose={toggleView}
      fullScreen={isMobile}
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
          {task?.status === "new" || task?.status === "pending" ? (
            <>
              {user?.role === "trainee" && (
                <Button
                  color={task.status === "new" ? "indigo" : "yellow"}
                  size="xs"
                  onClick={handleTaskStatus}
                  loading={taskState.isLoading}
                >
                  Start task
                </Button>
              )}
            </>
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
              ) : task?.status === "forqa" || task?.status === "pending" ? (
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
          {task?.spent !== "" ? (
            <Group align="flex-start">
              <Text className="w-1/4" c="dimmed" fz="sm">
                {task?.status === "completed" ? "Total Spent" : "Recorded"}
              </Text>
              <Text fz="sm">{task?.spent}</Text>
            </Group>
          ) : (
            ""
          )}

          {user?.role !== "trainee" && task?.status === "inprogress" && (
            <Group align="flex-start">
              <Text className="w-1/4" c="dimmed" fz="sm">
                On timesheet
              </Text>
              <Text fz="sm">
                {spent.totalSpent.hours === 1
                  ? spent.totalSpent.hours + "hr"
                  : spent.totalSpent.hours > 1
                  ? spent.totalSpent.hours + "hrs"
                  : spent.totalSpent.hours === 0 && ""}
                {spent.totalSpent.minutes === 1
                  ? spent.totalSpent.minutes + "min"
                  : spent.totalSpent.minutes > 1
                  ? spent.totalSpent.minutes + "mins"
                  : spent.totalSpent.minutes === 0 && ""}
              </Text>
            </Group>
          )}
          <Group align="center">
            <Text className="w-1/4" c="dimmed" fz="sm">
              Deliverable
            </Text>
            <Anchor href={task?.deliverable} target="_blank">
              <Button
                size="sm"
                variant="white"
                compact
                leftIcon={<IconLink size={18} />}
              >
                View
              </Button>
            </Anchor>
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
