import {
  Card,
  Text,
  ActionIcon,
  Flex,
  Group,
  Pagination,
  Menu,
  Stack,
  Popover,
  Box,
  Select,
  Button,
  Badge,
  TextInput,
  Highlight,
  Indicator,
} from "@mantine/core";
import { chunk } from "lodash";
import { useEffect, useState } from "react";
import { TimeSheetsLabels } from "../../components/ColorLabels";
import { IconClock, IconDots, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {
  useGetAllTraineeQuery,
  useGetTraineeProfileQuery,
} from "../../features/api/trainee/traineeApiSlice";
import { formatDateTime } from "../../utils/formatDateTime";
import { useGetAllTasksQuery } from "../../features/api/task/taskApiSlice";
import { calculateSpentTime } from "../../utils/calculateSpentTime";
import { ITrainee } from "../../interfaces/user.interface";
import { useAppSelector } from "../../app/hooks";
import { useDocumentTitle } from "@mantine/hooks";
import EmptyState from "../../components/EmptyState";
import { IconSearch } from "@tabler/icons-react";

// ? if trainee time out in dtr, task hour will automatically stop if time is the trainee out time.
// ? (ex. 12:00 PM and 5:00 PM, dtr time out and stop the timesheet)
// ? add task selection if in progress task is more than one.

interface PropsOnProfile {
  profile?: ITrainee;
}

const TimeSheets = ({ profile }: PropsOnProfile) => {
  const { user } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [opened, { close, open }] = useDisclosure(false);
  const { data: tasks } = useGetAllTasksQuery();
  const date = new Date();

  const { data: trainee } = useGetTraineeProfileQuery(undefined, {
    skip: user?.role !== "trainee",
  });
  const { data: trainees } = useGetAllTraineeQuery(
    profile ? profile?.course! : trainee?.course!
  );
  const profileInfo = trainees?.find((trainee) => trainee._id === profile?._id);

  const data =
    user?.role === "trainee" ? trainee?.timesheet : profileInfo?.timesheet;
  const allTimeSheets = data?.filter((search) =>
    search.date?.toLowerCase().includes(query.toLowerCase())
  );

  const items = chunk(allTimeSheets, 10);

  useDocumentTitle("Timesheet");
  const rows = items[page - 1]
    ?.slice()
    .sort((a, b) => b.date!.localeCompare(a.date!))
    .sort((a, b) => b.status!.localeCompare(a.status!))
    .map((sheet, index) => {
      const format = formatDateTime(sheet.date!);

      const time = {
        status: sheet.status,
        morning: sheet.morning,
        afternoon: sheet.afternoon,
      };
      const {
        spent,
        afternoonSpentString,
        morningSpentString,
        totalSpentString,
      } = calculateSpentTime(time);

      return (
        <tr key={index}>
          <td className="md:table-cell lg:table-cell pl-3">
            <Text>
              <Highlight highlightColor="cyan" highlight={query}>
                {format.date === date.toDateString() ? "Today" : format.date}
              </Highlight>
            </Text>
          </td>
          <td className="md:table-cell lg:table-cell">
            <Text>{sheet.task}</Text>
          </td>
          <td className="hidden md:table-cell lg:table-cell">
            <Text>{sheet.ticket}</Text>
          </td>
          <td className="py-2 hidden md:table-cell lg:table-cell ">
            <Text
              className={
                (sheet.status === "recording" &&
                  sheet.afternoon?.start !== "") ||
                sheet.morning?.end === ""
                  ? "animate-recording"
                  : ""
              }
            >
              <>
                {sheet.status === "recording" && (
                  <>
                    {sheet.morning?.start !== "" &&
                    sheet.morning?.end === "" &&
                    sheet.status === "recording" ? (
                      <span className="text-yellow-400 font-medium">+ </span>
                    ) : (
                      <>
                        {sheet.afternoon?.start === "" ||
                          (sheet.afternoon?.end === "" && (
                            <span className="text-indigo-400 font-medium">
                              +{" "}
                            </span>
                          ))}
                      </>
                    )}
                  </>
                )}
              </>

              {sheet.morning?.start !== "" &&
              sheet.morning?.end === "" &&
              sheet.status === "recording" ? (
                <span>{morningSpentString}</span>
              ) : sheet.afternoon?.start !== "" &&
                sheet.afternoon?.end === "" &&
                sheet.status === "recording" ? (
                <span>{afternoonSpentString}</span>
              ) : (
                <span>{totalSpentString}</span>
              )}
            </Text>
          </td>
          <td className="py-2 hidden md:table-cell lg:table-cell ">
            {sheet.status === "recorded" ? (
              <Flex
                align="center"
                gap={6}
                className="bg-gray-50 px-2 py-1 rounded w-max"
              >
                <div className={`w-2 h-2 bg-green-300`}></div>
                <Text
                  fw="bold"
                  className={`text-[10px] text-green-300 uppercase`}
                >
                  {sheet.status}
                </Text>
              </Flex>
            ) : (
              <Flex
                align="center"
                gap={6}
                className="bg-gray-50 px-2 py-1 rounded w-max"
              >
                <Indicator
                  processing
                  size={7}
                  radius={0}
                  color={
                    sheet.morning?.start !== "" && sheet.morning?.end === ""
                      ? "yellow"
                      : "indigo"
                  }
                  className="opacity-70"
                  ml={2}
                  mr={5}
                  mb={1}
                >
                  <span></span>
                </Indicator>
                <Text
                  fw="bold"
                  className={`text-[10px] uppercase ${
                    sheet.morning?.start !== "" && sheet.morning?.end === ""
                      ? "text-yellow-300"
                      : "text-indigo-300"
                  }`}
                >
                  {sheet.status}
                </Text>
              </Flex>
            )}
          </td>
          <td className="dark:text-gray-400 md:table-cell lg:table-cell">
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
                {/* {Object.values(sheet.morning!).every((value) => value === "") ? ( */}
                {sheet.morning?.start !== "" && (
                  <>
                    <Menu.Label>Morning</Menu.Label>
                    <Menu.Item p={0} className="bg-white hover:bg-white">
                      <Stack px={10} pb={5} spacing={1}>
                        <Group spacing={8}>
                          <IconClock size={16} className="text-yellow-300" />
                          <Text c="dark" fz="xs">
                            <span>{sheet.morning?.start}</span> -{" "}
                            <span
                              className={
                                sheet.morning?.end === "" ? "text-gray-500" : ""
                              }
                            >
                              {sheet.morning?.end === ""
                                ? "recording"
                                : sheet.morning?.end}
                            </span>
                          </Text>
                        </Group>
                        <Text c="dark" fz="xs">
                          Spent:{" "}
                          {spent.morning.spent.hours !== 0 &&
                            `${spent.morning.spent.hours}hr${
                              spent.morning.spent.hours !== 1 ? "s" : ""
                            }`}
                          {spent.morning.spent.minutes !== 0 &&
                            `${spent.morning.spent.minutes}min${
                              spent.morning.spent.minutes !== 1 ? "s" : ""
                            }`}
                        </Text>
                      </Stack>
                    </Menu.Item>
                    <Menu.Divider />
                  </>
                )}
                {/* ) : ( */}

                {sheet.afternoon?.start !== "" && (
                  <>
                    <Menu.Label>Afternoon</Menu.Label>
                    <Menu.Item p={0} className="bg-white hover:bg-white">
                      <Stack px={10} pb={5} spacing={1}>
                        <Group spacing={8}>
                          <IconClock size={16} className="text-violet-400" />
                          <Text c="dark" fz="xs">
                            <span>{sheet.afternoon?.start}</span> -{" "}
                            <span
                              className={
                                sheet.afternoon?.end === ""
                                  ? "text-gray-500"
                                  : ""
                              }
                            >
                              {sheet.afternoon?.end === ""
                                ? "recording"
                                : sheet.afternoon?.end}
                            </span>
                          </Text>
                        </Group>
                        <Text c="dark" fz="xs">
                          Spent:{" "}
                          {spent.afternoon.spent.hours !== 0 &&
                            `${spent.afternoon.spent.hours}hr${
                              spent.afternoon.spent.hours !== 1 ? "s" : ""
                            }`}
                          {spent.afternoon.spent.minutes !== 0 &&
                            `${spent.afternoon.spent.minutes}min${
                              spent.afternoon.spent.minutes !== 1 ? "s" : ""
                            }`}
                        </Text>
                      </Stack>
                    </Menu.Item>
                  </>
                )}
              </Menu.Dropdown>
            </Menu>
          </td>
        </tr>
      );
    });

  const inprogress = tasks?.find((task) =>
    task.status === "inprogress" && user?.role === "trainee"
      ? task.assign === trainee?.name
      : task.assign === profile?.name
  );
  // const oldtask = inprogress?.reduce((oldest, current) => {
  //   if (current.timeline?.startedAt! < oldest?.timeline?.startedAt!) {
  //     return current;
  //   }
  //   return oldest;
  // }, inprogress?.[0]);

  return (
    <div className="pb-5 lg:pb-0 md:pb-0">
      <Flex justify="space-between" pb={6} align="center">
        <TimeSheetsLabels />
        <Group className="" fz={12}>
          <Group spacing={8} c="dark">
            {inprogress && (
              <>
                {/* hide if sheet not started and inprogress task is more than one */}
                <Text fw="bold">Current task:</Text>
                <Popover
                  position="bottom-end"
                  withArrow
                  shadow="md"
                  opened={opened}
                >
                  <Popover.Target>
                    <Text
                      c="dimmed"
                      className="cursor-pointer hover:text-gray-400 transition-all"
                      onMouseEnter={open}
                      onMouseLeave={close}
                    >
                      {inprogress?.ticketno}
                    </Text>
                  </Popover.Target>
                  <Popover.Dropdown sx={{ pointerEvents: "none" }}>
                    <Box component="div">
                      <Text fw="bold" c="dark" fz="sm" pb={5}>
                        {inprogress?.taskname}
                      </Text>
                      {inprogress.timeline?.revisions.length !== 0 && (
                        <Group className="text-gray-500 py-1" spacing={10}>
                          <Text size="xs">Revisions</Text>
                          <Badge
                            size="sm"
                            color="red"
                            variant="light"
                            className="lowercase"
                          >
                            x{inprogress.timeline?.revisions.length}
                          </Badge>
                        </Group>
                      )}
                      <Group className="text-gray-500" fz="xs" spacing={8}>
                        <Text c="dark">Added:</Text>
                        <Text>
                          {formatDateTime(inprogress?.createdAt!).date +
                            " at " +
                            formatDateTime(inprogress?.createdAt!).time}
                        </Text>
                      </Group>
                      <Group className="text-gray-500" fz="xs" spacing={8}>
                        <Text c="dark">Started:</Text>
                        <Text>{inprogress?.timeline?.startedAt}</Text>
                      </Group>
                      <Group className="text-gray-500" fz="xs" spacing={8}>
                        <Text c="dark">Recorded spent:</Text>
                        <Text>{inprogress?.spent}</Text>
                      </Group>
                      {/* <Group className="text-gray-500" fz="xs" spacing={8}>
                        <Text c="dark">Deliverable:</Text>
                        <Button compact size="xs" variant="white">
                          View
                        </Button>
                      </Group> */}
                    </Box>
                  </Popover.Dropdown>
                </Popover>
              </>
            )}
          </Group>
        </Group>
      </Flex>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-163px)]">
        <div className="h-[95%]">
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
                  className="hidden md:table-cell lg:table-cell py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Total Spent</Text>
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

            {allTimeSheets?.length === 0 ? (
              <>
                <EmptyState text="No records found" />
              </>
            ) : (
              <tbody className="text-sm text-gray-600">{rows}</tbody>
            )}
          </table>
        </div>

        <Flex justify="space-between">
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
            placeholder="Search date, ex. May 9"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Group>
            <Text c="dimmed" fz="xs" className="hidden lg:flex md:flex">
              Page {page} of {items.length}
            </Text>
            <Pagination
              total={items.length}
              value={page}
              onChange={setPage}
              size="xs"
              color="teal"
            />
          </Group>
        </Flex>
      </Card>
    </div>
  );
};

export default TimeSheets;
