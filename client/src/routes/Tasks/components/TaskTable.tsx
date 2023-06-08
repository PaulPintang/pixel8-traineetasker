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
  Button,
  Badge,
  Menu,
  Image,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconExternalLink,
  IconId,
  IconInfoCircle,
  IconUser,
} from "@tabler/icons-react";
import { chunk } from "lodash";
import { useState, useEffect, ReactNode } from "react";
import avatar from "../../../assets/avatar.png";
import { tasks } from "../../Dashboard/components/TaskTableCard";

const TaskTable = () => {
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState<string | null>("");

  //   const data = members?.filter((member) =>
  //     filterBy ? member.status === filterBy : member
  //   );

  const items = chunk(tasks, 10);

  const rows = items[page - 1]?.map((task) => (
    <tr>
      <td className="hidden md:table-cell lg:table-cell pl-3 pt-2">
        <Text className="font-semibold">{task.deliverable}</Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell pl-3 pt-2">
        <Text className="font-semibold">{task.deliverable}</Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell pl-3 pt-2">
        <Text className="font-semibold">{task.deliverable}</Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell pl-3 pt-2">
        <Badge color="teal" size="md" variant="dot" className="text-gray-500">
          Available Task
        </Badge>
      </td>
      <td className="hidden md:table-cell lg:table-cell pl-3 pt-2">
        <Group className="rounded bg-gray-50 max-w-max px-2 py-1 gap-2">
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
        </Group>
      </td>

      <td className="hidden md:table-cell lg:table-cell pl-3 pt-2">
        <Menu shadow="md">
          <Menu.Target>
            <ActionIcon variant="white" color="cyan">
              <IconDots size={19} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Manage task</Menu.Label>
            <Flex direction="column" align="start">
              <Button
                leftIcon={<IconInfoCircle size={16} />}
                variant="white"
                color="dark"
                size="xs"
              >
                View
              </Button>
              <Button
                leftIcon={<IconUser size={16} />}
                variant="white"
                color="cyan"
                size="xs"
              >
                Assign
              </Button>
              <Button
                leftIcon={<IconEdit size={16} />}
                variant="white"
                size="xs"
                color="dark"
              >
                Edit
              </Button>
              <Button
                leftIcon={<IconUser size={16} />}
                variant="white"
                size="xs"
                color="red"
              >
                Delete
              </Button>
            </Flex>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-200px)] mt-4">
        <div className="h-[96%] overflow-hidden">
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
                  className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
                >
                  <Text>Task Name</Text>
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Ticket No.</Text>
                </th>

                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Assigned to</Text>
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
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
                  className="rounded-tr-md hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                ></th> */}
              </tr>
            </thead>
            <tbody className="text-xs text-gray-600">{rows}</tbody>
          </table>
        </div>

        <Flex justify="space-between">
          <Group align="center">
            {/* <Select
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
            /> */}
            <Flex>
              <Group spacing={3}>
                <Text fz="xs" className="uppercase font-semibold text-gray-700">
                  Total:
                </Text>
                <Text fz="xs">
                  {tasks.length} task{tasks.length >= 2 && "s"}
                </Text>
              </Group>
            </Flex>
          </Group>
          <Pagination
            total={items.length}
            value={page}
            onChange={setPage}
            size="xs"
            color="teal"
            withEdges
          />
        </Flex>
      </Card>
    </>
  );
};

export default TaskTable;
