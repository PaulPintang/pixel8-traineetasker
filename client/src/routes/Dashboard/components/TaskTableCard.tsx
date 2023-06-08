import {
  Card,
  Table,
  Text,
  Flex,
  Group,
  Pagination,
  Tooltip,
  ActionIcon,
  Select,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { chunk } from "lodash";
import { useState, useEffect, ReactNode } from "react";

export const tasks = [
  {
    task: "Dashboard",
    ticket: 12.011,
    deliverable: "C",
    status: "completed",
    spent: 8,
  },
  {
    task: "Header",
    ticket: 14.007,
    deliverable: "N",
    status: "new",
    spent: 12,
  },
  {
    task: "Data from backend",
    ticket: 88.906,
    deliverable: "Y",
    status: "inprogress",
    spent: 10,
  },
  {
    task: "Modals",
    ticket: 137.33,
    deliverable: "Ba",
    status: "failed",
    spent: 13,
  },
  {
    task: "component table",
    ticket: 140.12,
    deliverable: "Ce",
    status: "failed",
    spent: 8,
  },
  {
    task: "table paginatiom",
    ticket: 140.12,
    deliverable: "Ce",
    status: "inprogress",
    spent: 10,
  },
];

const TaskTableCard = () => {
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState<string | null>("");

  const data = tasks?.filter((task) =>
    filterBy ? task.status === filterBy : task
  );

  const items = chunk(data, 5);

  const rows = items[page - 1]?.map((task) => (
    <tr>
      <td className="hidden md:table-cell lg:table-cell pl-3">
        <Text>{task.task}</Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell">
        <Text>{task.ticket}</Text>
      </td>
      <td className="px-5 py-2 hidden md:table-cell lg:table-cell ">
        <Text>{task.spent}</Text>
      </td>
      <td className=" py-2 hidden md:table-cell lg:table-cell">
        <div className="flex bg-gray-100  rounded items-center max-w-max px-2 py-1 gap-2">
          <div
            className={`w-2 h-2 ${
              task.status === "new"
                ? "bg-indigo-300"
                : task.status === "inprogress"
                ? "bg-blue-300"
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
                ? "text-blue-300"
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
      <td className="dark:text-gray-400  hidden md:table-cell lg:table-cell">
        <Tooltip
          label={<small>View Deliverable</small>}
          withArrow
          color="indigo"
          position="bottom"
          py={2}
        >
          <ActionIcon color="indigo" size="sm">
            <IconExternalLink className="text-sm" />
          </ActionIcon>
        </Tooltip>
      </td>
    </tr>
  ));

  return (
    <>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-375px)]">
        <div className="h-[92%]">
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
                  className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
                >
                  <Text>Ticket No.</Text>
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell px-5 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Spent</Text>
                </th>

                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Status</Text>
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Action</Text>
                </th>
                {/* <th
                  scope="col"
                  className="rounded-tr-md hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
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
                  {data.length} task{data.length >= 2 && "s"}
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
    </>
  );
};

export default TaskTableCard;
