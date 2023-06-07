import { Card, Text, Flex, Group, Button, Pagination } from "@mantine/core";
import { chunk } from "lodash";
import { useState } from "react";
import { TimeSheetsLabels } from "../../components/ColorLabels";

const sheets = [
  {
    date: "Date",
    task: "Dashboard",
    ticket: 12.011,
    deliverable: "C",
    status: "completed",
    spent: 8,
  },
  {
    date: "Date",
    task: "Header",
    ticket: 14.007,
    deliverable: "N",
    status: "new",
    spent: 12,
  },
  {
    date: "Date",
    task: "Data from backend",
    ticket: 88.906,
    deliverable: "Y",
    status: "inprogress",
    spent: 10,
  },
  {
    date: "Date",
    task: "Modals",
    ticket: 137.33,
    deliverable: "Ba",
    status: "failed",
    spent: 13,
  },
  {
    date: "Date",
    task: "component table",
    ticket: 140.12,
    deliverable: "Ce",
    status: "failed",
    spent: 8,
  },
  {
    date: "Date",
    task: "table paginatiom",
    ticket: 140.12,
    deliverable: "Ce",
    status: "inprogress",
    spent: 10,
  },
  {
    date: "Date",
    task: "Dashboard",
    ticket: 12.011,
    deliverable: "C",
    status: "completed",
    spent: 8,
  },
  {
    date: "Date",
    task: "Header",
    ticket: 14.007,
    deliverable: "N",
    status: "new",
    spent: 12,
  },
  {
    date: "Date",
    task: "Data from backend",
    ticket: 88.906,
    deliverable: "Y",
    status: "inprogress",
    spent: 10,
  },
  {
    date: "Date",
    task: "Modals",
    ticket: 137.33,
    deliverable: "Ba",
    status: "failed",
    spent: 13,
  },
  {
    date: "Date",
    task: "component table",
    ticket: 140.12,
    deliverable: "Ce",
    status: "failed",
    spent: 8,
  },
  {
    date: "Date",
    task: "table paginatiom",
    ticket: 140.12,
    deliverable: "Ce",
    status: "inprogress",
    spent: 10,
  },
];

const TimeSheets = () => {
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState<string | null>("");

  const data = sheets?.filter((task) =>
    filterBy ? task.status === filterBy : task
  );

  const items = chunk(data, 10);

  const rows = items[page - 1]?.map((task) => (
    <tr>
      <td className="hidden md:table-cell lg:table-cell pl-3">
        <Text>{task.date}</Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell pl-3">
        <Text>{task.task}</Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell">
        <Text>{task.ticket}</Text>
      </td>
      <td className="px-5 py-2 hidden md:table-cell lg:table-cell ">
        <Text>{task.spent}</Text>
      </td>
      <td className=" py-2 hidden md:table-cell lg:table-cell"></td>
      <td className="dark:text-gray-400  hidden md:table-cell lg:table-cell"></td>
    </tr>
  ));

  return (
    <>
      <Flex justify="space-between" pb={6} align="center">
        <TimeSheetsLabels />
        <Group className="uppercase font-semibold" fz={12}>
          <Group spacing={8} c="dark">
            <Text>Current task:</Text>
            <Text>2843249813</Text>
          </Group>
          <Button size="xs">Start task</Button>
        </Group>
      </Flex>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-190px)]">
        <div className="h-[96%]">
          <table className="border-collapse border-none w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
                >
                  <Text>Date</Text>
                </th>
                <th
                  scope="col"
                  className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
                >
                  <Text>Task Name</Text>
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell px-5 py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Ticket No.</Text>
                </th>

                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Spent</Text>
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Status</Text>
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Expand</Text>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-600">{rows}</tbody>
          </table>
        </div>

        <Flex justify="space-between">
          <Text c="dimmed" fz="xs">
            Page {page} of {items.length}
          </Text>
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

export default TimeSheets;
