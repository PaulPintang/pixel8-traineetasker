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
} from "@mantine/core";
import { chunk } from "lodash";
import { useState } from "react";
import { TimeSheetsLabels } from "../../components/ColorLabels";
import { IconClock, IconDots } from "@tabler/icons-react";
import { checkTime } from "../../utils/checkTime";
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

interface PropsOnProfile {
  profile?: ITrainee;
}

const DailyTimeRecord = ({ profile }: PropsOnProfile) => {
  const { user } = useAppSelector((state) => state.auth);
  const [recordDtr, { isLoading }] = useUpdateDtrMutation();
  const { data: trainee, refetch } = useGetTraineeProfileQuery();
  const { data: trainees, isLoading: traineeLoading } = useGetAllTraineeQuery(
    profile?.course!,
    {
      skip: user?.role === "trainee",
    }
  );
  const [timesheet, sheetState] = useAddTaskTimesheetMutation();

  const profileInfo = trainees?.find((trainee) => trainee._id === profile?._id);

  const { data: tasks } = useGetAllTasksQuery();
  const date = new Date();
  const currentHour = date.getHours();

  const time = checkTime();
  // ?? SCHEDULE IS BASED ON ADMIN GIVEN SCHEDULE TIME
  // * hour is not set to 12, need to fix this
  const schedule = {
    morning: {
      in: 8,
      out: 12,
    },
    afternoon: {
      in: 13,
      out: 17,
    },
  };
  const [page, setPage] = useState(1);

  const handleTimeInOut = async () => {
    await recordDtr();
    const todaytask = trainee?.timesheet?.some(
      (record) => record.date === formatDateTime(date.toISOString()).date
    );
    const isThereInProgress = tasks?.some(
      (task) => task.status === "inprogress"
    );
    if (!todaytask && isThereInProgress) {
      const inprogress = tasks?.filter((task) => task.status === "inprogress");
      const sheet = {
        task: inprogress?.[0].taskname,
        ticket: inprogress?.[0].ticketno,
      };
      await timesheet({ sheet, rooms: [user?.course!] });
    }

    refetch();
  };

  const data = user?.role === "trainee" ? trainee?.dtr : profileInfo?.dtr;

  const items = chunk(data, 10);

  const today = trainee?.dtr?.find(
    (record) => record.date === formatDateTime(date.toISOString()).date
  );

  useDocumentTitle("DailyTimeRecords");

  const rows = items[page - 1]?.map((record: IDtr, index) => (
    <tr key={index} className="border-none ">
      <td className=" md:table-cell lg:table-cell pl-3">
        <Text>
          {formatDateTime(record.date!).date === date.toDateString()
            ? "Today"
            : formatDateTime(record.date!).date}
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
        {record.status === "recorded" ? (
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

  const isTimeIn =
    !today && schedule.morning.in === currentHour
      ? true
      : today?.afternoon?.in === "" && schedule.afternoon.in === currentHour
      ? true
      : false;
  const isTimeOut =
    today?.morning?.out === "" && schedule.morning.out === currentHour
      ? true
      : today?.afternoon?.out === "" && schedule.afternoon.out === currentHour
      ? true
      : false;

  return (
    <>
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
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-160px)]">
        <div className="h-[96%]">
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

            {data?.length === 0 ? (
              <>
                <EmptyState text="No records found" />;
              </>
            ) : (
              <tbody className="text-sm text-gray-600">{rows}</tbody>
            )}
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
