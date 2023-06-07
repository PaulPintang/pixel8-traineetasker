import { Button, Title, Text, Grid, Card, Box, Flex } from "@mantine/core";
import { lazy, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, logout } from "../../features/auth/authSlice";
import ToastNotify from "../../components/ToastNotify";
import AccountsTable from "./components/AccountsTable";

const Dashboard = lazy(() => import("../Dashboard/Dashboard"));

const Home = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <Title order={3}>On the Job Training / Internship</Title>
      <Text c="dark">System Administrator</Text>

      <Box className="h-[calc(100vh-210px)]">
        <Card className="rounded-md shadow-md space-y-[11px] " mt={18}>
          <Flex justify="space-between">
            <Text>Manage accounts</Text>
            <Button size="xs" color="cyan">
              Add Account
            </Button>
          </Flex>
          <AccountsTable />
        </Card>
      </Box>
      <Text className="text-gray-500  text-sm font-semibold">
        @ 2023 | Pixel8 Web Solutions
      </Text>
    </>
  );
};

export default Home;
