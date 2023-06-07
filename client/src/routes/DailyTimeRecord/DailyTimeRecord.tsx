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

const DailyTimeRecord = () => {
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState<string | null>("");

  const data = sheets?.filter((task) =>
    filterBy ? task.status === filterBy : task
  );

  const items = chunk(data, 10);

  const rows = items[page - 1]?.map((task) => (
    <tr className="border-none ">
      <td className="dark:text-gray-400 py-2 hidden md:table-cell lg:table-cell pl-3">
        {task.date}
      </td>
      <td className="dark:text-gray-400 py-2 hidden md:table-cell lg:table-cell">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <div className="bg-yellow-300 w-2 h-2" />
            <span>234</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-indigo-300 w-2 h-2" />
            <span>234</span>
          </div>
        </div>
      </td>
      <td className="dark:text-gray-400 py-2 hidden md:table-cell lg:table-cell ">
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <div className="bg-yellow-300 w-2 h-2" />
            <span>4234</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-indigo-300 w-2 h-2" />
            <span>423</span>
          </div>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <Flex justify="space-between" align="center" pb={6}>
        <TimeSheetsLabels />

        <Button color="yellow" size="xs">
          Start Time In
        </Button>
      </Flex>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-190px)]">
        <div className="h-[96%]">
          <table className="border-collapse border-none w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[12px] font-[600] text-gray-400 tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[12px] font-[600] text-gray-400 tracking-wider  bg-gray-100 shadow-sm"
                >
                  Morning
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[12px] font-[600] text-gray-400 tracking-wider bg-gray-100 shadow-sm"
                >
                  Afternoon
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[12px] font-[600] text-gray-400 tracking-wider bg-gray-100 shadow-sm"
                >
                  Status
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

export default DailyTimeRecord;
