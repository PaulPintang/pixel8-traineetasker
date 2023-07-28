import {
  Card,
  Flex,
  Group,
  Pagination,
  Button,
  Text,
  Select,
  Image,
  TextInput,
  Highlight,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconMessage, IconX } from "@tabler/icons-react";
import { chunk, filter } from "lodash";
import { useEffect, useState } from "react";
import ViewTaskModal from "../../Tasks/components/modals/ViewTaskModal";
import { useAppSelector } from "../../../app/hooks";
import { useGetTraineeProfileQuery } from "../../../features/api/trainee/traineeApiSlice";
import { calculateSpentTime } from "../../../utils/calculateSpentTime";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
import EmptyState from "../../../components/EmptyState";
import GettingData from "../../../components/GettingData";
import { IconSearch } from "@tabler/icons-react";
import {
  useGetNotificationQuery,
  useReadAllNotificationMutation,
} from "../../../features/api/notification/notificationApiSlice";
import { ITask } from "../../../interfaces/task.interface";

const TaskTableCard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: tasks, refetch, isLoading, isFetching } = useGetAllTasksQuery();
  const { taskOnNotif } = useAppSelector((state) => state.notif);
  const { data: notifications } = useGetNotificationQuery();
  const [readAllNotification] = useReadAllNotificationMutation();
  const [view, { toggle }] = useDisclosure();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [viewId, setViewId] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<string | null>("");
  const [gettingData, setGettingData] = useState(false);

  const { data: trainee } = useGetTraineeProfileQuery();

  const sheet = trainee?.timesheet?.find((task) => task.status === "recording");
  const time = {
    status: sheet?.status!,
    morning: sheet?.morning!,
    afternoon: sheet?.afternoon,
  };
  const { totalSpentString } = calculateSpentTime(time);

  const alltask = tasks?.filter((search) =>
    search.taskname?.toLowerCase().includes(query.toLowerCase())
  );

  const data = alltask?.filter((task) =>
    filterBy
      ? task.status === filterBy
      : user?.role === "trainee"
      ? user?.name === task.assign
      : task
  );

  const items = chunk(data, 5);

  useEffect(() => {
    if (filterBy) {
      refetch().then(() => setGettingData(false));
    }
  }, [filterBy]);

  const onViewTask = (task: ITask) => {
    toggle();
    setViewId(task._id!);
    const notif = notifications?.find(
      (notif) => notif.task === taskOnNotif || notif.task === task.taskname
    );
    if (notif) {
      readAllNotification({ task: task.taskname! });
    }
  };

  const rows = items[page - 1]?.map((task) => {
    return (
      <tr key={task._id}>
        <td className=" md:table-cell lg:table-cell pl-3">
          <Text>
            <Highlight highlightColor="cyan" highlight={query}>
              {task.taskname!}
            </Highlight>
          </Text>
        </td>
        <td className="hidden md:table-cell lg:table-cell">
          <Text>{task.ticketno}</Text>
        </td>
        <td className="px-5 py-2  md:table-cell lg:table-cell ">
          <Text>
            {task.spent !== "" ? task.spent : <span>{totalSpentString}</span>}
          </Text>
        </td>
        <td className=" py-2 hidden md:table-cell lg:table-cell">
          <div className="flex bg-gray-100  rounded items-center max-w-max px-2 py-1 gap-2">
            <div
              className={`w-2 h-2 ${
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
            <Text
              fw="bold"
              className={`text-[10px] ${
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
          </div>
        </td>
        <td className="dark:text-gray-400   md:table-cell lg:table-cell">
          <Button
            onClick={() => onViewTask(task)}
            leftIcon={<IconInfoCircle size={16} />}
            variant="white"
            color="cyan"
            size="xs"
          >
            View
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      {/* <Card className="bg-opacity-60 rounded-md shadow-md h-full"> */}
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-100px)] lg:h-[calc(100vh-365px)] md:h-[calc(100vh-365px)]">
        <div className="h-[95%] lg:h-[90%] md:h-[90%]">
          {/* <div className="h-[90%]"> */}
          <table className="border-collapse border-none w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
                >
                  <Text>Task Name</Text>
                </th>
                <th
                  scope="col"
                  className="hidden  md:table-cell lg:table-cell rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
                >
                  <Text>Ticket No.</Text>
                </th>
                <th
                  scope="col"
                  className=" md:table-cell lg:table-cell px-5 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Total spent</Text>
                </th>

                <th
                  scope="col"
                  className="hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Status</Text>
                </th>
                <th
                  scope="col"
                  className="  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Action</Text>
                </th>
              </tr>
            </thead>
            {gettingData && filterBy ? (
              <GettingData />
            ) : data?.length === 0 ? (
              <>
                <EmptyState
                  text={
                    query ? "Task not found" : `There are no ${filterBy!} tasks`
                  }
                />
              </>
            ) : (
              <tbody className="text-xs text-gray-600">{rows}</tbody>
            )}
          </table>
        </div>

        <Flex justify="space-between" className="overflow-hidden">
          <Group align="center" spacing={10}>
            <TextInput
              className="hidden lg:flex md:flex"
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
            <Group spacing={3} className="hidden">
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
            />
          </Group>
        </Flex>
      </Card>
      <ViewTaskModal
        tasks={tasks}
        viewId={viewId}
        view={view}
        toggleView={toggle}
      />
    </>
  );
};

export default TaskTableCard;
