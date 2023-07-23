import {
  Card,
  Text,
  Flex,
  Group,
  Button,
  Pagination,
  ActionIcon,
  Menu,
  Stack,
  TextInput,
  Highlight,
  Indicator,
} from "@mantine/core";
import { chunk } from "lodash";
import { useState } from "react";
import { TimeSheetsLabels } from "../../components/ColorLabels";
import { IconClock, IconDots, IconSearch, IconX } from "@tabler/icons-react";
import {
  useAddTaskTimesheetMutation,
  useGetAllTraineeQuery,
  useGetTraineeProfileQuery,
  useUpdateDtrMutation,
} from "../../features/api/trainee/traineeApiSlice";
import { IDtr } from "../../interfaces/records.interface";
import { formatDateTime } from "../../utils/formatDateTime";
import { useGetAllTasksQuery } from "../../features/api/task/taskApiSlice";
import { useAppSelector } from "../../app/hooks";
import { ITrainee } from "../../interfaces/user.interface";
import { useDocumentTitle } from "@mantine/hooks";
import EmptyState from "../../components/EmptyState";
import { checkSchedule } from "../../utils/checkSchedule";
import { JoinRoom } from "../../utils/socketConnect";
import ToastNotify from "../../components/ToastNotify";
import { checkTime } from "../../utils/checkTime";

interface PropsOnProfile {
  profile?: ITrainee;
}

const DailyTimeRecord = ({ profile }: PropsOnProfile) => {
  const { user } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const date = new Date();

  const [recordDtr, { isLoading }] = useUpdateDtrMutation();
  const { data: trainee } = useGetTraineeProfileQuery(undefined, {
    skip: user?.role !== "trainee",
  });

  const { data: trainees } = useGetAllTraineeQuery(
    profile ? profile?.course! : trainee?.course!
  );

  const profileInfo = trainees?.find((trainee) => trainee._id === profile?._id);

  const data = user?.role === "trainee" ? trainee?.dtr : profileInfo?.dtr;

  const allRecords = data?.filter((search) =>
    search.date?.toLowerCase().includes(query.toLowerCase())
  );

  const items = chunk(allRecords, 10);
  const day = checkTime();

  const handleTimeInOut = async () => {
    // JoinRoom(user?.course!, user?.role!);
    await recordDtr({ rooms: [user?.course!] });
    ToastNotify(
      ` ${day === "morning" ? "Time in" : "Time out"} at exactly ${
        formatDateTime().time
      }`,
      "success"
    );
  };

  useDocumentTitle("DailyTimeRecords");

  const rows = items[page - 1]
    ?.slice()
    .sort((a, b) => b.date!.localeCompare(a.date!))
    .map((record: IDtr, index) => (
      <tr key={index} className="border-none ">
        <td className=" md:table-cell lg:table-cell pl-3">
          <Text>
            <Highlight highlightColor="cyan" highlight={query}>
              {formatDateTime().date === record.date ? "Today" : record.date!}
            </Highlight>
          </Text>
        </td>
        <td className="hidden md:table-cell lg:table-cell">
          <Flex>
            <Group spacing={8}>
              <IconClock size={16} className="text-yellow-400" />
              <span>{record.morning?.in}</span> -{" "}
              <span>{record.morning?.out}</span>
            </Group>
          </Flex>
        </td>
        <td className="hidden md:table-cell lg:table-cell">
          <Flex>
            <Group spacing={8}>
              <IconClock size={16} className="text-violet-400" />
              <span>{record.afternoon?.in}</span> -{" "}
              <span>{record.afternoon?.out}</span>
            </Group>
          </Flex>
        </td>
        <td className="py-2  md:table-cell lg:table-cell ">
          {/* {record.status === "recorded" ? (
            <Flex align="center" gap={8} className="w-full">
              <div className="bg-green-300 p-1"></div>
              <Text
                fz="sm"
                className="text-gray-400 text-[10px] uppercase font-semibold "
              >
                recorded
              </Text>
            </Flex>
          ) : (
            <Text fz="xs" fw="bold">
              {record.status}
            </Text>
          )} */}
          {record.status === "recorded" ? (
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
                {record.status}
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
                  record.morning?.in !== "" && record.morning?.out === ""
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
                  record.morning?.in !== "" && record.morning?.out === ""
                    ? "text-yellow-300"
                    : "text-indigo-300"
                }`}
              >
                {record.status}
              </Text>
            </Flex>
          )}
        </td>
        <td className="py-2 table-cell  md:hidden lg:hidden ">
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
              {record.morning?.in !== "" && (
                <>
                  <Menu.Label>Morning</Menu.Label>
                  <Menu.Item p={0} className="bg-white hover:bg-white">
                    <Stack px={10} pb={5} spacing={1}>
                      <Group spacing={8} className="text-xs">
                        <IconClock size={16} className="text-yellow-400" />
                        <span>{record.morning?.in}</span> -{" "}
                        <span>{record.morning?.out}</span>
                      </Group>
                    </Stack>
                  </Menu.Item>
                  <Menu.Divider />
                </>
              )}

              {record.afternoon?.in !== "" && (
                <>
                  <Menu.Label>Afternoon</Menu.Label>
                  <Menu.Item p={0} className="bg-white hover:bg-white">
                    <Stack px={10} pb={5} spacing={1}>
                      <Group spacing={8} className="text-xs">
                        <IconClock size={16} className="text-violet-400" />
                        <span>{record.afternoon?.in}</span> -{" "}
                        <span>{record.afternoon?.out}</span>
                      </Group>
                    </Stack>
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </td>
      </tr>
    ));

  const { isTimeIn, isTimeOut, today } = checkSchedule(trainee?.dtr!);

  return (
    <div className="pb-3">
      <Flex justify="space-between" align="center" pb={6}>
        <TimeSheetsLabels />
        {user?.role === "trainee" && (
          <>
            {!today || today?.status !== "recorded" ? (
              <>
                {isTimeIn ? (
                  <Button
                    color="yellow"
                    size="xs"
                    onClick={handleTimeInOut}
                    loading={isLoading}
                  >
                    Time in
                  </Button>
                ) : (
                  ""
                )}

                {isTimeOut ? (
                  <Button
                    color="indigo"
                    size="xs"
                    onClick={handleTimeInOut}
                    loading={isLoading}
                  >
                    Time out
                  </Button>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </>
        )}
      </Flex>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-160px)] ">
        <div className="h-[95%]">
          <table className="border-collapse border-none w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className=" md:px-3 lg:px-3 pl-3 py-3 text-left text-[12px] font-[600] text-gray-400 tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="hidden  md:table-cell lg:table-cell rounded-tl-md md:rounded-none lg:rounded-none py-3  md:pr-3 lg:pr-3 text-left text-[12px] font-[600] text-gray-400 tracking-wider  bg-gray-100 shadow-sm"
                >
                  Morning
                </th>
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell py-3 text-left text-[12px] font-[600] text-gray-400 tracking-wider bg-gray-100 shadow-sm rounded-tr-md lg:rounded-none"
                >
                  Afternoon
                </th>
                <th
                  scope="col"
                  className="  md:table-cell lg:table-cell  py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm lg:rounded-tr-md rounded-none"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="  md:hidden lg:hidden table-cell  py-3 text-left text-[11px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md"
                ></th>
              </tr>
            </thead>

            {allRecords?.length === 0 ? (
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

export default DailyTimeRecord;
