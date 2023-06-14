import {
  Center,
  Flex,
  Button,
  Title,
  NumberInput,
  Grid,
  Box,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { lazy, useState } from "react";
import { TasksLabels } from "../../components/ColorLabels";
import TaskCards from "./components/TaskCards";
import InfoCard from "./components/InfoCard";
import TaskTableCard from "./components/TaskTableCard";
import TasksTodoCard from "./components/TasksTodoCard";
const MembersTableCard = lazy(() => import("./components/MembersTableCard"));
import MembersAssignTask from "./components/MembersAssignTask";
import { useGetTraineeQuery } from "../../features/api/trainee/traineeApiSlice";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Grid pb={5}>
        <Grid.Col className="space-y-1" span={8}>
          <TasksLabels />
          <TaskCards />
        </Grid.Col>
        <Grid.Col span={4}>
          <InfoCard />
        </Grid.Col>

        {user?.role === "trainee" ? (
          <>
            <Grid.Col span={8}>
              <TaskTableCard />
            </Grid.Col>
            <Grid.Col className="bg-bl ue-300" span={4}>
              <TasksTodoCard />
            </Grid.Col>
          </>
        ) : (
          <MembersTableCard />
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
