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
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconInfoCircle,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import AssignMemberModal from "./modals/AssignMemberModal";
import { Dispatch, SetStateAction } from "react";
import {
  useDeleteTaskMutation,
  useGetAllTasksQuery,
} from "../../../features/api/task/taskApiSlice";
import { formatDateTime } from "../../../utils/formatDateTime";
import { useAppSelector } from "../../../app/hooks";
import { useLocation } from "react-router-dom";
import { ITask } from "../../../interfaces/task.interface";
import { ITrainee } from "../../../interfaces/user.interface";
import { chunk } from "lodash";

interface Props {
  trainee: ITrainee;
  setViewId: Dispatch<SetStateAction<string | null>>;
  view: () => void;
  update: () => void;
}

const TaskTable = ({ trainee, view, update, setViewId }: Props) => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const { data: tasks } = useGetAllTasksQuery();
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const [assign, { toggle }] = useDisclosure();
  const [page, setPage] = useState(1);
  const [task, setTask] = useState<ITask>({});
  const [filterBy, setFilterBy] = useState<string | null>("");

  const data = tasks?.filter((task) =>
    filterBy
      ? task.status === filterBy
      : trainee
      ? trainee.name === task.assign
      : task
  );

  const handleDelete = async (_id: string) => {
    await deleteTask({ _id, rooms: [user?.course] });
  };

  const items = chunk(data, 10);

  const rows = items[page - 1]?.map((task) => {
    const format = formatDateTime(task?.createdAt!);
    return (
      <tr>
        <td className=" md:table-cell lg:table-cell pl-3 pt-2">
          <Text className="font-semibold">
            <span className="hidden md:flex lg:flex">
              {`${format.date} at ${format.time}`}
            </span>
            <span className="flex md:hidden lg:hidden">{format.date}</span>
          </Text>
        </td>
        <td className="hidden md:table-cell lg:table-cell  pt-2">
          <Text className="font-semibold">{task.taskname}</Text>
        </td>
        <td className="hidden md:table-cell lg:table-cell  pt-2">
          <Text className="font-semibold">{task.ticketno}</Text>
        </td>

        {!pathname.includes("profile") ? (
          <td className="hidden md:table-cell lg:table-cell  pt-2">
            {task.assign ? (
              <Text className="font-semibold">{task.assign}</Text>
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
            className="rounded bg-gray-50 max-w-max px-2 py-1 gap-2"
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
                // setOpened(false);
              }}
              leftIcon={
                <IconInfoCircle size={16} className="hidden md:flex lg:flex" />
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

              <Menu.Dropdown className="flex row-a">
                <Menu.Label>Manage task</Menu.Label>

                <Flex direction="column" align="start">
                  <Menu.Item p={0} className="bg-white hover:bg-white">
                    <Button
                      onClick={() => {
                        view();
                        setViewId(task._id!);
                        // setOpened(false);
                      }}
                      leftIcon={<IconInfoCircle size={16} />}
                      variant="white"
                      color="dark"
                      size="xs"
                    >
                      View
                    </Button>
                  </Menu.Item>
                  {task.status === "new" && (
                    <Menu.Item p={0} className="bg-white hover:bg-white">
                      {user?.role === "Task manager" ||
                      user?.role === "QA Personnel" ||
                      pathname.includes("profile") ? (
                        <Button
                          onClick={() => {
                            setTask(task);
                            toggle();
                          }}
                          leftIcon={<IconUser size={16} />}
                          variant="white"
                          color={task.assign ? "indigo" : "cyan"}
                          size="xs"
                        >
                          {task.assign ? "Reassign" : "Assign"}
                        </Button>
                      ) : (
                        ""
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item p={0} className="bg-white hover:bg-white">
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
                  </Menu.Item>

                  {user?.role !== "QA Personnel" && (
                    <Button
                      leftIcon={<IconUser size={16} />}
                      variant="white"
                      size="xs"
                      color="red"
                      onClick={() => handleDelete(task._id!)}
                      loading={isLoading}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
              </Menu.Dropdown>
            </Menu>
          )}
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-200px)] mt-4">
        <div className="h-[95%] overflow-">
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
                  <Text>Ticket No.</Text>
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
            <tbody className="text-xs text-gray-600">{rows}</tbody>
          </table>
        </div>

        <Flex justify="space-between">
          <Group align="center">
            <Select
              size="xs"
              value={filterBy}
              onChange={setFilterBy}
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
            <Flex>
              <Group spacing={3}>
                <Text fz="xs" className="uppercase font-semibold text-gray-700">
                  Total:
                </Text>
                <Text fz="xs">
                  {data?.length} task{data?.length! >= 2 && "s"}
                </Text>
              </Group>
            </Flex>
          </Group>
          <Pagination
            total={items.length}
            value={page}
            onChange={setPage}
            size="xs"
            color="cyan"
            withEdges
          />
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
