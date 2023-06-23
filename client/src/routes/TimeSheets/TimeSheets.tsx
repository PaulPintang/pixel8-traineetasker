import {
  Card,
  Text,
  ActionIcon,
  Flex,
  Group,
  Button,
  Pagination,
  Menu,
  Stack,
  Popover,
  Box,
  Select,
} from "@mantine/core";
import { chunk } from "lodash";
import { useState, useEffect } from "react";
import { TimeSheetsLabels } from "../../components/ColorLabels";
import { IconClock, IconDots } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { sheets } from "../../data/sheets";
// import { Sheets } from "../../interfaces/sheet.interface";
import { tasks } from "../../data/tasks";
import { ITask } from "../../interfaces/task.interface";
import { useGetTraineeProfileQuery } from "../../features/api/trainee/traineeApiSlice";
import { formatDateTime } from "../../utils/formatDateTime";

// ? if trainee time out in dtr, task hour will automatically stop if time is the trainee out time.
// ? (ex. 12:00 PM and 5:00 PM, dtr time out and stop the timesheet)
// ? add task selection if in progress task is more than one.

const TimeSheets = () => {
  const [page, setPage] = useState(1);
  const [opened, { close, open }] = useDisclosure(false);

  // ? test, filter should be in backend
  // const [mysheet, setMysheet] = useState<Sheets[]>([]);
  const [mytask, setMyTask] = useState<ITask[]>([]);

  useEffect(() => {
    // setMysheet(sheets?.filter((sheet) => sheet.member === "Paul"));
    setMyTask(tasks.filter((task) => task.status === "inprogress"));
  }, []);

  const { data: trainee } = useGetTraineeProfileQuery();

  const items = chunk(trainee?.timesheet, 10);

  const rows = items[page - 1]?.map((sheet) => {
    const format = formatDateTime(sheet.date!);
    return (
      <tr>
        <td className="hidden md:table-cell lg:table-cell pl-3">
          <Text>
            {format.date} at {format.time}
          </Text>
        </td>
        <td className="hidden md:table-cell lg:table-cell">
          <Text>{sheet.task}</Text>
        </td>
        <td className="hidden md:table-cell lg:table-cell">
          <Text>{sheet.ticket}</Text>
        </td>
        <td className="py-2 hidden md:table-cell lg:table-cell ">
          <Text>{sheet.spent}</Text>
        </td>
        <td className="py-2 hidden md:table-cell lg:table-cell ">
          <Text fw="bold" fz="xs">
            {sheet.status}
          </Text>
        </td>
        <td className="dark:text-gray-400  hidden md:table-cell lg:table-cell">
          <Menu
            shadow="md"
            transitionProps={{ transition: "rotate-right", duration: 150 }}
            withArrow
          >
            <Menu.Target>
              <ActionIcon variant="white" color="cyan">
                <IconDots size={19} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Morning</Menu.Label>
              <Menu.Item p={0} className="bg-white hover:bg-white">
                {/* <Text>Time</Text> */}
                <Stack px={10} pb={5}>
                  <Group spacing={8}>
                    <IconClock size={16} className="text-yellow-300" />
                    {/* <span>01:00 PM</span> - <span>05:00 PM</span> */}
                    <Text c="dark" fz="xs">
                      {/* <span>{sheet.morning.start}</span> -{" "} */}
                      <span className="text-gray-500">recording</span>
                    </Text>
                  </Group>
                </Stack>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Label>Afternoon</Menu.Label>
              <Menu.Item p={0} className="bg-white hover:bg-white">
                {/* <Text>Time</Text> */}
                <Stack px={10} pb={5}>
                  <Group spacing={8}>
                    <IconClock size={16} className="text-violet-400" />
                    {/* <span>01:00 PM</span> - <span>05:00 PM</span> */}
                    {/* <Text c="dark" fz="xs">
                    <span>{sheet.afternoon.start}</span> -{" "}
                    <span>{sheet.afternoon.end}</span>
                  </Text> */}
                  </Group>
                </Stack>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    );
  });

  // const handleTask = () => {
  //   setMysheet([...mysheet, ...mysheet]);
  // };

  return (
    <>
      <Flex justify="space-between" pb={6} align="center">
        <TimeSheetsLabels />
        <Group className="" fz={12}>
          <Group spacing={8} c="dark">
            <>
              {/* ? hide if inprogress task if only one and timesheet started  */}
              <Text fw="bold">Select:</Text>
              <Select
                size="xs"
                placeholder="Pick one"
                data={[
                  { value: "react", label: "Header Page" },
                  { value: "ng", label: "Dashboard UI" },
                  { value: "svelte", label: "Menu" },
                  { value: "vue", label: "Mobile Responsive" },
                ]}
              />
            </>
            <>
              {/* hide if sheet not started and inprogress task is more than one */}
              <Text fw="bold">Task:</Text>
              <Popover position="bottom" withArrow shadow="md" opened={opened}>
                <Popover.Target>
                  <Text
                    c="dimmed"
                    className="cursor-pointer hover:text-gray-400 transition-all"
                    onMouseEnter={open}
                    onMouseLeave={close}
                  >
                    {mytask[0]?.ticketno}
                  </Text>
                </Popover.Target>
                <Popover.Dropdown sx={{ pointerEvents: "none" }}>
                  <Box component="div">
                    <Text fw="bold" c="dark" fz="sm" pb={5}>
                      Header page
                    </Text>
                    <Group className="text-gray-500" fz="xs" spacing={8}>
                      <Text>Added:</Text>
                      <Text>Monday, June 07 2023</Text>
                    </Group>
                    <Group className="text-gray-500" fz="xs" spacing={8}>
                      <Text>Started:</Text>
                      <Text>Wednesday, June 07 2023</Text>
                    </Group>
                  </Box>
                </Popover.Dropdown>
              </Popover>
            </>
          </Group>

          {/* hide if no seletected task, and show if inporgress task is only one  */}
          {/* <Button size="xs" onClick={handleTask}>
            Start
          </Button> */}
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
                  className=" md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
                >
                  <Text>Task Name</Text>
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell  py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
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
                  className=" py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md"
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
