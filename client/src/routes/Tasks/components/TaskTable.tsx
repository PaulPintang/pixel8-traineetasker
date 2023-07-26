import {
  Card,
  Text,
  Flex,
  Group,
  Pagination,
  ActionIcon,
  Select,
  Button,
  Badge,
  Menu,
  Stack,
  Highlight,
  TextInput,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconInfoCircle,
  IconSearch,
  IconTrash,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import AssignMemberModal from "./modals/AssignMemberModal";
import { Dispatch, SetStateAction } from "react";
import {
  useDeleteTaskMutation,
  useGetAllTasksQuery,
} from "../../../features/api/task/taskApiSlice";
import { formatDateTime } from "../../../utils/formatDateTime";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useLocation } from "react-router-dom";
import { ITask } from "../../../interfaces/task.interface";
import { ITrainee } from "../../../interfaces/user.interface";
import { chunk, filter } from "lodash";
import GettingData from "../../../components/GettingData";
import EmptyState from "../../../components/EmptyState";
import { calculateSpentTime } from "../../../utils/calculateSpentTime";
import ToastNotify from "../../../components/ToastNotify";
import ViewTaskModal from "./modals/ViewTaskModal";
import { reset } from "../../../features/notif/notificationSlice";

interface Props {
  trainee: ITrainee;
  setViewId: Dispatch<SetStateAction<string | null>>;
  view: () => void;
}

const TaskTable = ({ trainee, view, setViewId }: Props) => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const [filterBy, setFilterBy] = useState<string | null>("");
  const [gettingData, setGettingData] = useState(false);
  const { data: tasks, refetch } = useGetAllTasksQuery();
  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();
  const [assign, { toggle }] = useDisclosure();
  const [page, setPage] = useState(1);
  const [task, setTask] = useState<ITask>({});
  const [query, setQuery] = useState("");

  const dispatch = useAppDispatch();
  const { taskOnNotif } = useAppSelector((state) => state.notif);

  useEffect(() => {
    if (filterBy) {
      refetch().then(() => setGettingData(false));
    }
  }, [filterBy]);

  const alltask = tasks?.filter((search) =>
    search.taskname?.toLowerCase().includes(query.toLowerCase())
  );

  const data = alltask?.filter((task) =>
    filterBy
      ? task.status === filterBy
      : trainee
      ? trainee.name === task.assign
      : task
  );

  const handleDelete = async (_id: string) => {
    await deleteTask({ _id, rooms: [user?.course] });
    ToastNotify("Task deleted successfully", "success");
  };

  const items = chunk(data, 10);

  const rows = items[page - 1]
    ?.slice()
    .sort((a, b) =>
      b.timeline!.createdAt!.localeCompare(a.timeline!.createdAt!)
    )
    .map((task) => {
      const sheet = trainee?.timesheet?.find(
        (task) => task.status === "recording"
      );
      const time = {
        status: sheet?.status!,
        morning: sheet?.morning!,
        afternoon: sheet?.afternoon,
      };
      const { spent, totalSpentString } = calculateSpentTime(time);
      return (
        <tr key={task._id}>
          <td className=" md:table-cell lg:table-cell pl-3 pt-2">
            <Text>
              <span className="hidden md:flex lg:flex">
                {task.timeline?.createdAt}
              </span>
              <span className="flex md:hidden lg:hidden">
                {task.timeline?.createdAt}
              </span>
            </Text>
          </td>
          <td className="hidden md:table-cell lg:table-cell  pt-2">
            <Text>
              <Highlight highlightColor="cyan" highlight={query}>
                {task.taskname!}
              </Highlight>
            </Text>
          </td>
          <td className="hidden md:table-cell lg:table-cell  pt-2">
            <Text>
              {trainee && (
                <span>
                  {task.status === "inprogress" && task.spent === "" ? (
                    <span>{totalSpentString}</span>
                  ) : (
                    task.spent
                  )}
                </span>
              )}

              {!trainee && task.ticketno}
            </Text>
          </td>

          {!pathname.includes("profile") ? (
            <td className="hidden md:table-cell lg:table-cell  pt-2">
              {task.assign ? (
                <Text>{task.assign}</Text>
              ) : (
                <Badge
                  color="teal"
                  size="md"
                  variant="dot"
                  className="text-gray-500"
                >
                  Available Task
                </Badge>
              )}
            </td>
          ) : (
            ""
          )}

          <td className=" md:table-cell lg:table-cell  pt-2">
            <Flex
              className={`rounded bg-gray-50 max-w-max px-2 py-1 gap-2 ${
                task.taskname === taskOnNotif ? "animate-searching" : ""
              }`}
              align="center"
            >
              <div>
                <div
                  className={`p-1 ${
                    task.status === "new"
                      ? "bg-indigo-300"
                      : task.status === "inprogress"
                      ? "bg-violet-400"
                      : task.status === "completed"
                      ? "bg-green-300"
                      : task.status === "forqa"
                      ? "bg-yellow-300"
                      : "bg-red-300"
                  }`}
                ></div>
              </div>
              <Text
                fw="bold"
                className={`text-[11px] ${
                  task.status === "new"
                    ? "text-indigo-300"
                    : task.status === "inprogress"
                    ? "text-violet-400"
                    : task.status === "completed"
                    ? "text-green-300"
                    : task.status === "forqa"
                    ? "text-yellow-300"
                    : "text-red-300"
                }`}
              >
                {task.status}
              </Text>
            </Flex>
          </td>

          <td className=" md:table-cell lg:table-cell  pt-2">
            {user?.role === "supervisor" || user?.role === "admin" ? (
              <Button
                onClick={() => {
                  view();
                  setViewId(task._id!);
                }}
                leftIcon={
                  <IconInfoCircle
                    size={16}
                    className="hidden md:flex lg:flex"
                  />
                }
                variant="white"
                color="cyan"
                size="xs"
              >
                View
              </Button>
            ) : (
              <Menu
                shadow="md"
                transitionProps={{ transition: "rotate-right", duration: 150 }}
                closeOnItemClick
                withArrow
              >
                <Menu.Target>
                  <ActionIcon variant="white" color="cyan">
                    <IconDots size={19} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Manage task</Menu.Label>

                  <Stack spacing={9} py={5} align="center" className="w-full">
                    <Menu.Item
                      className="bg-white hover:bg-white"
                      py={0}
                      onClick={() => {
                        view();
                        setViewId(task._id!);
                        dispatch(reset());
                      }}
                      icon={<IconInfoCircle size={16} />}
                    >
                      <Text fz="xs" fw="bold" c="dark">
                        View
                      </Text>
                    </Menu.Item>

                    {task.status === "new" &&
                      (user?.role === "Task manager" ||
                      user?.role === "QA Personnel" ||
                      pathname.includes("profile") ? (
                        <Menu.Item
                          className="bg-white hover:bg-white"
                          py={0}
                          onClick={() => {
                            setTask(task);
                            toggle();
                          }}
                          icon={<IconUser size={16} />}
                          color={task.assign ? "indigo" : "cyan"}
                        >
                          <Text fz="xs" fw="bold">
                            {task.assign ? "Reassign" : "Assign"}
                          </Text>
                        </Menu.Item>
                      ) : null)}
                    {/* <Menu.Item p={0} className="bg-white hover:bg-white">
                    <Button
                      onClick={() => {
                        update();
                        // setOpened(false);
                      }}
                      leftIcon={<IconEdit size={16} />}
                      variant="white"
                      size="xs"
                      color="dark"
                    >
                      Edit
                    </Button>
                  </Menu.Item> */}

                    {user?.role !== "QA Personnel" &&
                      task?.status === "new" && (
                        <Button
                          leftIcon={<IconTrash size={16} />}
                          variant="white"
                          size="xs"
                          color="red"
                          onClick={() => {
                            handleDelete(task._id!);
                          }}
                          loading={deleting}
                          compact
                          mr={5}
                        >
                          Delete
                        </Button>
                      )}
                  </Stack>
                </Menu.Dropdown>
              </Menu>
            )}
          </td>
        </tr>
      );
    });

  return (
    <>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-170px)] mt-4">
        <div className="h-[94%] overflow-">
          <table className="border-collapse border-none w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
                >
                  <Text>Date Added</Text>
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell  py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
                >
                  <Text>Task Name</Text>
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>{trainee ? "Total spent" : "Ticket no."}</Text>
                </th>

                {!pathname.includes("profile") && (
                  <th
                    scope="col"
                    className="hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                  >
                    <Text>Assigned to</Text>
                  </th>
                )}

                <th
                  scope="col"
                  className="  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Status</Text>
                </th>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md"
                >
                  <Text>Action</Text>
                </th>
                {/* <th
                  scope="col"
                  className="rounded-tr-md  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                ></th> */}
              </tr>
            </thead>
            {gettingData && filterBy ? (
              // {gettingData && filterBy && !assign && !deleting ? (
              <GettingData />
            ) : (
              <>
                {data?.length === 0 ? (
                  <EmptyState
                    text={
                      query === ""
                        ? `There are no ${filterBy!} tasks`
                        : "Task not found"
                    }
                  />
                ) : (
                  <tbody className="text-sm text-gray-600">{rows}</tbody>
                )}
              </>
            )}
          </table>
        </div>

        <Flex justify="space-between">
          <Group align="center" spacing={10}>
            <TextInput
              rightSection={
                query ? (
                  <IconX
                    onClick={() => setQuery("")}
                    size={14}
                    className="hover:cursor-pointer text-gray-500 hover:text-gray-800 transition-all"
                  />
                ) : (
                  <IconSearch size={14} className="text-gray-500" />
                )
              }
              size="xs"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <Select
              size="xs"
              value={filterBy}
              onChange={(val) => {
                setGettingData(true);
                setFilterBy(val);
              }}
              w={150}
              placeholder="Filter"
              data={[
                { value: "", label: "All tasks" },
                { value: "new", label: "New" },
                { value: "inprogress", label: "In-Progress" },
                { value: "forqa", label: "For-QA" },
                { value: "failed", label: "Failed" },
                { value: "completed", label: "Completed" },
              ]}
            />
          </Group>
          <Group>
            <Group spacing={3}>
              <Text fz="xs" className="uppercase font-semibold text-gray-700">
                Total:
              </Text>
              <Text fz="xs">
                {data?.length} task{data?.length! >= 2 && "s"}
              </Text>
            </Group>
            <Pagination
              total={items.length}
              value={page}
              onChange={setPage}
              size="xs"
              color="cyan"
              withEdges
            />
          </Group>
        </Flex>
      </Card>
      <AssignMemberModal
        task={task}
        // assignId={assignId}
        assign={assign}
        toggle={toggle}
      />
    </>
  );
};

export default TaskTable;
