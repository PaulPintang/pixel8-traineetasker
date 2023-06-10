import { Card, Text, Flex, Group, Button, Pagination } from "@mantine/core";
import { chunk } from "lodash";
import { useEffect, useState } from "react";
import { TimeSheetsLabels } from "../../components/ColorLabels";
import { IconClock } from "@tabler/icons-react";

const sheets = [
  {
    date: "Monday, January 4 2023",
    task: "Dashboard",
    ticket: 12.011,
    deliverable: "C",
    status: "completed",
    spent: 8,
  },
  {
    date: "Monday, January 3 2023",
    task: "Header",
    ticket: 14.007,
    deliverable: "N",
    status: "new",
    spent: 12,
  },
  {
    date: "Monday, January 2 2023",
    task: "Data from backend",
    ticket: 88.906,
    deliverable: "Y",
    status: "inprogress",
    spent: 10,
  },
  {
    date: "Monday, January 1 2023",
    task: "Modals",
    ticket: 137.33,
    deliverable: "Ba",
    status: "failed",
    spent: 13,
  },
];

interface Records {
  date: string;
  status: "recording" | "recorded";
  morning: {
    in: string;
    out: string;
  };
  afternoon: {
    in: string;
    out: string;
  };
}

const DailyTimeRecord = () => {
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState<string | null>("");
  const [dtr, setDtr] = useState<Records>({
    date: "",
    status: "recording",
    morning: {
      in: "",
      out: "",
    },
    afternoon: {
      in: "",
      out: "",
    },
  });
  const [records, setRecords] = useState<Records[]>([]);

  const handleTimeIn = () => {
    setRecords([
      ...records,
      {
        ...dtr,
        morning: {
          ...dtr.morning,
          in: "in",
        },
      },
    ]);
  };

  const items = chunk(records, 10);

  const rows = items[page - 1]?.map((record) => (
    <tr className="border-none ">
      <td className="hidden md:table-cell lg:table-cell pl-3">
        <Text>{record.date}</Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell">
        <Flex>
          <Group spacing={8}>
            <IconClock size={16} className="text-yellow-400" />
            {/* <span>08:00 AM</span> - <span>12:00 PM</span> */}
            <span>{record.morning.in}</span> - <span>{record.morning.out}</span>
          </Group>
        </Flex>
      </td>
      <td className="hidden md:table-cell lg:table-cell">
        <Flex>
          <Group spacing={8}>
            <IconClock size={16} className="text-violet-400" />
            {/* <span>01:00 PM</span> - <span>05:00 PM</span> */}
            <span>{record.afternoon.in}</span> -{" "}
            <span>{record.morning.out}</span>
          </Group>
        </Flex>
      </td>
      <td className="py-2 hidden md:table-cell lg:table-cell ">
        <Text fw="bold" fz="xs">
          {record.status}
        </Text>
      </td>
    </tr>
  ));

  return (
    <>
      <Flex justify="space-between" align="center" pb={6}>
        <TimeSheetsLabels />

        <Button color="yellow" size="xs" onClick={handleTimeIn}>
          Time In
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
                  className="py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md"
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
