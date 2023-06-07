import { Center, Flex, Button, Title, NumberInput } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  reset,
  decrement,
  increment,
  incrementByAmount,
} from "../features/counter/counterSlice";
import { useState } from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>This is dashboard component. Im here cause im authenticated!</h1>
    </div>
  );
};

export default Dashboard;
