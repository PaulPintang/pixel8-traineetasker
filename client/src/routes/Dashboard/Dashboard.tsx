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

import { lazy, useState, useEffect } from "react";
import { TasksLabels } from "../../components/ColorLabels";
import TaskCards from "./components/TaskCards";
import InfoCard from "./components/InfoCard";
import TaskTableCard from "./components/TaskTableCard";
import TasksTodoCard from "./components/TasksTodoCard";
const MembersTableCard = lazy(() => import("./components/MembersTableCard"));
import MembersAssignTask from "./components/MembersAssignTask";
import { useGetTraineeQuery } from "../../features/api/trainee/traineeApiSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  useDocumentTitle("Dashboard");

  return (
    <>
      <Grid pb={5}>
        <Grid.Col className="space-y-1" md={8} lg={8} sm="auto">
          <TasksLabels />
          <TaskCards />
        </Grid.Col>
        <Grid.Col lg={4} md={4} sm="auto">
          <InfoCard />
        </Grid.Col>

        {user?.role === "trainee" ? (
          <>
            <Grid.Col md={8} lg={8} sm="auto">
              <TaskTableCard />
            </Grid.Col>
            <Grid.Col className="bg-bl ue-300" md={4} lg={4} sm="auto">
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
