import { Flex, Card, Text, ActionIcon, Grid } from "@mantine/core";
import {
  Icon24Hours,
  IconCalendarCheck,
  IconFilePower,
  IconSquareRoundedCheck,
  IconStar,
  IconUrgent,
} from "@tabler/icons-react";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { useGetTraineeProfileQuery } from "../../../features/api/trainee/traineeApiSlice";
import { useLocation } from "react-router-dom";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";

const TaskCards = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const { data: trainee } = useGetTraineeProfileQuery(user?._id, {
    skip: user?.role !== "trainee",
  });
  const { data: tasks } = useGetAllTasksQuery();
  return (
    <Grid grow>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          <div className="bg-teal-300 w-8 h-1"></div>
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconStar size={18} />
            </ActionIcon>
            {user?.role === "trainee" || pathname.includes("profile") ? (
              <>
                <Text fz={13} c="dimmed">
                  New Task
                </Text>
                <Text>
                  {tasks?.filter((task) => task.status === "new").length}
                </Text>
              </>
            ) : (
              <>
                <Text fz={13} c="dimmed">
                  All Tasks
                </Text>
                <Text>{tasks?.length}</Text>
              </>
            )}
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          {user?.role === "trainee" || pathname.includes("profile") ? (
            <div className="bg-red-300 w-8 h-1"></div>
          ) : (
            <div className="bg-blue-300 w-8 h-1"></div>
          )}
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconUrgent size={18} />
            </ActionIcon>

            {user?.role === "trainee" || pathname.includes("profile") ? (
              <>
                <Text fz={13} c="dimmed">
                  Failed
                </Text>
                <Text>
                  {tasks?.filter((task) => task.status === "failed").length}
                </Text>
              </>
            ) : (
              <>
                <Text fz={13} c="dimmed">
                  Available
                </Text>
                <Text>
                  {tasks?.filter((task) => task.status === "new").length}
                </Text>
              </>
            )}
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          {user?.role === "trainee" || pathname.includes("profile") ? (
            <div className="bg-green-300 w-8 h-1"></div>
          ) : (
            <div className="bg-violet-300 w-8 h-1"></div>
          )}
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconSquareRoundedCheck size={18} />
            </ActionIcon>

            {user?.role === "trainee" || pathname.includes("profile") ? (
              <>
                <Text fz={13} c="dimmed">
                  Completed
                </Text>

                <Text>
                  {tasks?.filter((task) => task.status === "completed").length}
                </Text>
              </>
            ) : (
              <>
                <Text fz={13} c="dimmed">
                  In Progress
                </Text>
                <Text>
                  {tasks?.filter((task) => task.status === "inprogress").length}
                </Text>
              </>
            )}
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          {user?.role === "trainee" || pathname.includes("profile") ? (
            <div className="bg-teal-300 w-8 h-1"></div>
          ) : (
            <div className="bg-green-300 w-8 h-1"></div>
          )}

          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <Icon24Hours size={18} />
            </ActionIcon>
            {user?.role === "trainee" || pathname.includes("profile") ? (
              <>
                <Text fz={13} c="dimmed">
                  OJT hours
                </Text>
                <Text>{trainee?.hours?.ojtHours}</Text>
              </>
            ) : (
              <>
                <Text fz={13} c="dimmed">
                  Completed
                </Text>
                <Text>
                  {tasks?.filter((task) => task.status === "completed").length}
                </Text>
              </>
            )}
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          {user?.role === "trainee" || pathname.includes("profile") ? (
            <div className="bg-violet-400 w-8 h-1"></div>
          ) : (
            <div className="bg-yellow-400 w-8 h-1"></div>
          )}
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconFilePower size={18} />
            </ActionIcon>
            {user?.role === "trainee" || pathname.includes("profile") ? (
              <>
                <Text fz={13} c="dimmed">
                  Pending hours
                </Text>
                <Text>{trainee?.hours?.pending}</Text>
              </>
            ) : (
              <>
                <Text fz={13} c="dimmed">
                  For QA
                </Text>
                <Text>
                  {tasks?.filter((task) => task.status === "forqa").length}
                </Text>
              </>
            )}
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          {user?.role === "trainee" || pathname.includes("profile") ? (
            <div className="bg-green-300 w-8 h-1"></div>
          ) : (
            <div className="bg-red-300 w-8 h-1"></div>
          )}
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconCalendarCheck size={18} />
            </ActionIcon>
            {user?.role === "trainee" || pathname.includes("profile") ? (
              <>
                <Text fz={13} c="dimmed">
                  Rendered hours
                </Text>
                <Text>{trainee?.hours?.rendered}</Text>
              </>
            ) : (
              <>
                <Text fz={13} c="dimmed">
                  Failed
                </Text>
                <Text>
                  {tasks?.filter((task) => task.status === "failed").length}
                </Text>
              </>
            )}
          </Flex>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default TaskCards;
