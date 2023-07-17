import {
  Box,
  Card,
  Flex,
  Text,
  Group,
  Avatar,
  Tooltip,
  Skeleton,
} from "@mantine/core";
import { useAppSelector } from "../../../app/hooks";
import {
  useGetAllTraineeQuery,
  useGetTraineeProfileQuery,
} from "../../../features/api/trainee/traineeApiSlice";
import { ITrainee } from "../../../interfaces/user.interface";
import { useLocation } from "react-router-dom";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
import { formatDateTime } from "../../../utils/formatDateTime";

interface Props {
  trainee?: ITrainee;
}

const InfoCard = ({ trainee }: Props) => {
  const date = new Date();
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const { data: profile, isLoading } = useGetTraineeProfileQuery(user?._id!, {
    skip: user?.role !== "trainee",
  });
  const { data: trainees, isLoading: traineesLoading } = useGetAllTraineeQuery(
    user?.course!
  );
  const { data: tasks } = useGetAllTasksQuery();

  const sheet =
    user?.role === "trainee"
      ? profile?.timesheet?.find(
          (task) => task.date === formatDateTime(date.toISOString()).date
        )
      : trainee?.timesheet?.find(
          (task) => task.date === formatDateTime(date.toISOString()).date
        );

  return (
    <Card className="h- rounded-md shadow-md space-y-[6px]">
      <Box component="div">
        {isLoading || traineesLoading ? (
          <Skeleton
            height={12}
            mt={6}
            width="70%"
            radius="xl"
            visible={isLoading || traineesLoading}
          />
        ) : (
          <Text fz={12} className="text-gray-800 font-semibold uppercase">
            {user?.role === "trainee" ? user?.name : user?.course}
          </Text>
        )}

        {user?.role === "trainee" || pathname.includes("profile") ? (
          <>
            <Box component="div" p={8} pl={10}>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  OJT Required hours:
                </Text>
                {isLoading ? (
                  <Skeleton
                    height={12}
                    width="20%"
                    radius="xl"
                    visible={isLoading}
                  />
                ) : (
                  <Text fz={12} c="dimmed">
                    {trainee
                      ? trainee?.hours?.ojtHours
                      : profile?.hours?.ojtHours}{" "}
                    hours
                  </Text>
                )}
              </Group>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  Started:
                </Text>
                {isLoading ? (
                  <Skeleton
                    height={12}
                    width="40%"
                    radius="xl"
                    visible={isLoading}
                  />
                ) : (
                  <Text fz={12} c="dimmed">
                    {user?.role === "trainee" ? (
                      <span>
                        {profile?.started === ""
                          ? "OJT not started"
                          : profile?.started}
                      </span>
                    ) : (
                      <span>
                        {trainee?.started === ""
                          ? "OJT not started"
                          : trainee?.started}
                      </span>
                    )}
                  </Text>
                )}
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
                  {isLoading ? (
                    <Skeleton
                      height={12}
                      width="40%"
                      radius="xl"
                      visible={isLoading}
                    />
                  ) : (
                    <Text fz={12} c="dimmed">
                      {sheet?.task ? sheet?.task : "None"}
                    </Text>
                  )}
                </Group>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    Timesheet records:
                  </Text>
                  {isLoading ? (
                    <Skeleton
                      height={12}
                      width="40%"
                      radius="xl"
                      visible={isLoading}
                    />
                  ) : (
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
                  )}
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
                {traineesLoading ? (
                  <Skeleton
                    height={12}
                    width="20%"
                    radius="xl"
                    visible={traineesLoading}
                  />
                ) : (
                  <Text fz={12} c="dimmed">
                    {trainees?.length} trainee's
                  </Text>
                )}
              </Group>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  Completed task:
                </Text>
                {traineesLoading ? (
                  <Skeleton
                    height={12}
                    width="20%"
                    radius="xl"
                    visible={traineesLoading}
                  />
                ) : (
                  <Text fz={12} c="dimmed">
                    {
                      tasks?.filter((task) => task.status === "completed")
                        .length
                    }{" "}
                    tasks
                  </Text>
                )}
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
                  {traineesLoading ? (
                    <Skeleton
                      height={12}
                      width="20%"
                      radius="xl"
                      visible={traineesLoading}
                    />
                  ) : (
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
                  )}
                </Group>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    No. of in progress task:
                  </Text>
                  {traineesLoading ? (
                    <Skeleton
                      height={12}
                      width="20%"
                      radius="xl"
                      visible={traineesLoading}
                    />
                  ) : (
                    <Text fz={12} c="dimmed">
                      {
                        tasks?.filter((task) => task.status === "inprogress")
                          .length
                      }{" "}
                      tasks
                    </Text>
                  )}
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
          {trainees?.length === 0 && (
            <Text fz={12} c="dimmed">
              No current trainee's
            </Text>
          )}
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing="sm">
              {trainees?.map((trainee) => (
                <Tooltip
                  key={trainee._id}
                  label={trainee.name === user?.name ? "You" : trainee.name}
                  withArrow
                >
                  {isLoading || traineesLoading ? (
                    <Skeleton height={25} visible={true} circle />
                  ) : (
                    <Avatar
                      src={trainee.picture}
                      radius="xl"
                      size={27}
                      imageProps={{ referrerPolicy: "no-referrer" }}
                    />
                  )}
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
