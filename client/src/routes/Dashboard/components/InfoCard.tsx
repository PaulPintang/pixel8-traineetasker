import { Box, Card, Flex, Text, Group, Avatar, Tooltip } from "@mantine/core";
import { useAppSelector } from "../../../app/hooks";
import {
  useGetAllTraineeQuery,
  useGetTraineeProfileQuery,
} from "../../../features/api/trainee/traineeApiSlice";
import { ITrainee } from "../../../interfaces/user.interface";
import { useLocation } from "react-router-dom";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
import { calculateSpentTime } from "../../../utils/calculateSpentTime";
import { formatDateTime } from "../../../utils/formatDateTime";

interface Props {
  trainee?: ITrainee;
}

const InfoCard = ({ trainee }: Props) => {
  const date = new Date();
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile } = useGetTraineeProfileQuery(user?._id!, {
    skip: user?.role !== "trainee",
  });
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);
  const { data: tasks } = useGetAllTasksQuery();

  const todayTask = trainee?.timesheet?.find(
    (task) => task.date === formatDateTime(date.toISOString()).date
  );
  const task = tasks?.find((task) => task.ticketno === todayTask?.ticket);

  const sheet =
    user?.role === "trainee"
      ? profile?.timesheet?.find(
          (task) => task.date === formatDateTime(date.toISOString()).date
        )
      : trainee?.timesheet?.find(
          (task) => task.date === formatDateTime(date.toISOString()).date
        );

  // const time = {
  //   status: sheet?.status!,
  //   morning: sheet?.morning,
  //   afternoon: sheet?.afternoon,
  // };
  // const spent = calculateSpentTime(time);

  return (
    <Card className="h- rounded-md shadow-md space-y-[6px]">
      <Box component="div">
        <Text fz={12} className="text-gray-800 font-semibold uppercase">
          {user?.role === "trainee" ? user?.name : user?.course}
        </Text>
        {user?.role === "trainee" || pathname.includes("profile") ? (
          <>
            <Box component="div" p={8} pl={10}>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  OJT Required hours:
                </Text>
                <Text fz={12} c="dimmed">
                  {trainee
                    ? trainee?.hours?.ojtHours
                    : profile?.hours?.ojtHours}{" "}
                  hours
                </Text>
              </Group>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  Started:
                </Text>
                <Text fz={12} c="dimmed">
                  June 07, 2023
                </Text>
              </Group>
            </Box>
            <Box component="div">
              <Text fz={12} className="text-gray-800 font-semibold uppercase">
                Daily Summary
              </Text>
              <Box component="div" p={5} pl={10}>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    Inprogress Task:
                  </Text>
                  <Text fz={12} c="dimmed">
                    {/* {todayTask?.task} */}
                    {sheet?.task}
                  </Text>
                </Group>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    Timesheet records:
                  </Text>
                  <Text fz={12} c="dimmed">
                    {user?.role === "trainee"
                      ? profile?.timesheet?.filter(
                          (sheet) =>
                            sheet.date ===
                            formatDateTime(date.toISOString()).date
                        ).length
                      : trainee?.timesheet?.filter(
                          (sheet) =>
                            sheet.date ===
                            formatDateTime(date.toISOString()).date
                        ).length}
                  </Text>
                </Group>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box component="div" p={8} pl={10}>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  Total members:
                </Text>
                <Text fz={12} c="dimmed">
                  {trainees?.length} trainee's
                </Text>
              </Group>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  Completed task:
                </Text>
                <Text fz={12} c="dimmed">
                  {tasks?.filter((task) => task.status === "completed").length}{" "}
                  tasks
                </Text>
              </Group>
            </Box>
            <Box component="div">
              <Text fz={12} className="text-gray-800 font-semibold uppercase">
                Today Summary
              </Text>
              <Box component="div" p={5} pl={10}>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    No. of completed task:
                  </Text>
                  <Text fz={12} c="dimmed">
                    {
                      tasks?.filter(
                        (task) =>
                          task.status === "completed" &&
                          formatDateTime(task.timeline?.completedAt!).date ===
                            formatDateTime(date.toISOString()).date
                      ).length
                    }{" "}
                    task
                  </Text>
                </Group>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    No. of in progress task:
                  </Text>
                  <Text fz={12} c="dimmed">
                    {
                      tasks?.filter((task) => task.status === "inprogress")
                        .length
                    }{" "}
                    tasks
                  </Text>
                </Group>
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Flex align="center" gap={10}>
        <Group>
          <Text c="dark" size="xs" className="font-semibold">
            Members:
          </Text>
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing="sm">
              {trainees?.map((trainee) => (
                <Tooltip
                  label={trainee.name === user?.name ? "You" : trainee.name}
                  withArrow
                >
                  <Avatar
                    src={trainee.picture}
                    radius="xl"
                    size={27}
                    imageProps={{ referrerPolicy: "no-referrer" }}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </Tooltip.Group>
        </Group>
      </Flex>
    </Card>
  );
};

export default InfoCard;
