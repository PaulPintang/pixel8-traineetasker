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
import {
  reset,
  decrement,
  increment,
  incrementByAmount,
} from "../../features/counter/counterSlice";
import { useState } from "react";
import { TasksLabels } from "../../components/ColorLabels";
import TaskCards from "./components/TaskCards";
import InfoCard from "./components/InfoCard";
import TaskTableCard from "./components/TaskTableCard";
import TasksTodoCard from "./components/TasksTodoCard";
import MembersTableCards from "./components/MembersTableCards";
import MembersAssignTask from "./components/MembersAssignTask";

const Dashboard = () => {
  return (
    <>
      <Grid>
        <Grid.Col className="space-y-1" span={8}>
          <TasksLabels />
          <TaskCards />
        </Grid.Col>
        <Grid.Col span={4}>
          <InfoCard />
        </Grid.Col>
        <Grid.Col span={8}>
          {/* <TaskTableCard /> */}
          <MembersTableCards />
        </Grid.Col>
        <Grid.Col className="bg-bl ue-300" span={4}>
          {/* <TasksTodoCard /> */}
          <MembersAssignTask />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Dashboard;
