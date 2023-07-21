import { Card, Group, Text, Box, Badge } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
import { formatDateTime } from "../../../utils/formatDateTime";
import { useGetTraineeProfileQuery } from "../../../features/api/trainee/traineeApiSlice";
import { calculateSpentTime } from "../../../utils/calculateSpentTime";
import { useAppSelector } from "../../../app/hooks";
interface Props {
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const InProgress = ({ toggle, setViewId }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: tasks } = useGetAllTasksQuery();
  const inprogress = tasks?.filter((task) => task.status === "inprogress");

  const { data: trainee } = useGetTraineeProfileQuery(undefined, {
    skip: user?.role !== "trainee",
  });

  const sheet = trainee?.timesheet?.find((task) => task.status === "recording");
  const time = {
    status: sheet?.status!,
    morning: sheet?.morning,
    afternoon: sheet?.afternoon,
  };
  const spent = calculateSpentTime(time);
  return (
    <div className="space-y-3">
      {inprogress?.map((task) => (
        <Card
          key={task._id}
          className="cursor-pointer hover:shadow-xl rounded-md shadow-md transition-all"
          onClick={() => {
            toggle();
            setViewId(task._id!);
          }}
        >
          <div className="bg-violet-300 w-8 h-1"></div>
          <Box pt={15} className="space-y-1">
            <Text fw="bold" c="dark" fz="sm">
              {task.taskname}
            </Text>
            <Badge variant="filled" color="violet" size="sm">
              in-progress
            </Badge>
            {task.timeline?.revisions.length !== 0 && (
              <Group className="text-gray-500" spacing={10}>
                <Text size="xs">Revisions</Text>
                <Badge
                  size="sm"
                  color="red"
                  variant="light"
                  className="lowercase"
                >
                  x{task.timeline?.revisions.length}
                </Badge>
              </Group>
            )}
            <Box>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Ticket:</Text>
                <Text>{task.ticketno}</Text>
              </Group>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Added:</Text>
                <Text>
                  {formatDateTime(task.createdAt!).date +
                    " at " +
                    formatDateTime(task.createdAt!).time}
                </Text>
              </Group>
              <Group className="text-gray-500" fz="xs" spacing={8}>
                <Text>Started:</Text>
                <Text>{task.timeline?.startedAt}</Text>
              </Group>
              {sheet?.status === "recording" && (
                <Group className="text-gray-500" fz="xs" spacing={8}>
                  {task.timeline?.revisions.length !== 0 ? (
                    <Text>Revision time: </Text>
                  ) : (
                    <Text>On timesheet: </Text>
                  )}
                  <Text fw="bold" className="animate-recording">
                    {task.timeline?.revisions.length !== 0 ? (
                      <span>+ </span>
                    ) : (
                      ""
                    )}
                    {/* {spent.totalSpent.hours === 1
                      ? spent.totalSpent.hours + "hr"
                      : spent.totalSpent.hours > 1
                      ? spent.totalSpent.hours + "hrs"
                      : spent.totalSpent.hours === 0 && ""}
                    {spent.totalSpent.minutes === 1
                      ? spent.totalSpent.minutes + "min"
                      : spent.totalSpent.minutes > 1
                      ? spent.totalSpent.minutes + "mins"
                      : spent.totalSpent.minutes === 0 && ""} */}
                    {
                      sheet.morning?.start !== "" &&
                      sheet.morning?.end !== "" &&
                      sheet.status === "recording" ? (
                        <span>
                          {spent.afternoon.spent.hours === 1
                            ? spent.afternoon.spent.hours + "hr"
                            : spent.afternoon.spent.hours > 1
                            ? spent.afternoon.spent.hours + "hrs"
                            : spent.afternoon.spent.hours === 0 && ""}
                          {spent.afternoon.spent.minutes === 1
                            ? spent.afternoon.spent.minutes + "min"
                            : spent.afternoon.spent.minutes > 1
                            ? spent.afternoon.spent.minutes + "mins"
                            : spent.afternoon.spent.minutes === 0 && ""}
                        </span>
                      ) : sheet.afternoon?.start !== "" &&
                        sheet.afternoon?.end !== "" &&
                        sheet.status === "recording" ? (
                        <span>
                          {spent.morning.spent.hours === 1
                            ? spent.morning.spent.hours + "hr"
                            : spent.morning.spent.hours > 1
                            ? spent.morning.spent.hours + "hrs"
                            : spent.morning.spent.hours === 0 && ""}
                          {spent.morning.spent.minutes === 1
                            ? spent.morning.spent.minutes + "min"
                            : spent.morning.spent.minutes > 1
                            ? spent.morning.spent.minutes + "mins"
                            : spent.morning.spent.minutes === 0 && ""}
                        </span>
                      ) : (
                        ""
                      )
                      // <span>
                      //   {spent.totalSpent.hours === 1
                      //     ? spent.totalSpent.hours + "hr"
                      //     : spent.totalSpent.hours > 1
                      //     ? spent.totalSpent.hours + "hrs"
                      //     : spent.totalSpent.hours === 0 && ""}
                      //   {spent.totalSpent.minutes === 1
                      //     ? spent.totalSpent.minutes + "min"
                      //     : spent.totalSpent.minutes > 1
                      //     ? spent.totalSpent.minutes + "mins"
                      //     : spent.totalSpent.minutes === 0 && ""}
                      // </span>
                    }
                  </Text>
                </Group>
              )}
              {task.timeline?.revisions.length !== 0 ? (
                <Group className="text-gray-500" fz="xs" spacing={8}>
                  <Text>Recorded spent: </Text>
                  <Text fw="bold">{task.spent}</Text>
                </Group>
              ) : (
                ""
              )}
            </Box>
          </Box>
        </Card>
      ))}

      {inprogress?.length === 0 && (
        <Text c="dimmed" fs="italic" fz="xs" className="tracking-normal">
          there are no in progress tasks!
        </Text>
      )}
    </div>
  );
};

export default InProgress;
