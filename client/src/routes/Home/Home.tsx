import {
  Button,
  Title,
  Text,
  Grid,
  Card,
  Box,
  Flex,
  Group,
} from "@mantine/core";
import { lazy, Suspense } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ToastNotify from "../../components/ToastNotify";

// const AccountsTable = lazy(() => import("./components/AccountsTable"));
import AccountsTable from "./components/AccountsTable";
import { IconClock } from "@tabler/icons-react";
import AddAccountModal from "./components/AddAccountModal";
import ScheduleModal from "./components/ScheduleModal";
import { useDisclosure } from "@mantine/hooks";
import Documentation from "../Documentation";

const Dashboard = lazy(() => import("../Dashboard/Dashboard"));

const Home = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [time, timeToggle] = useDisclosure();
  const [add, addToggle] = useDisclosure();

  return (
    <>
      {user?.role === "admin" ? (
        <>
          <Flex align="center" justify="space-between">
            <Title order={3}>On the Job Training / Internship</Title>
            <Button
              onClick={timeToggle.toggle}
              leftIcon={<IconClock size={18} />}
              variant="white"
              color="cyan"
              size="xs"
            >
              Edit Schedule
            </Button>
          </Flex>

          <Box className="h-[calc(100vh-210px)]">
            <Card className="rounded-md shadow-md space-y-[11px] " mt={18}>
              <Flex justify="space-between">
                <Text>Manage accounts</Text>
                <Button size="xs" color="cyan" onClick={addToggle.toggle}>
                  Add Account
                </Button>
              </Flex>
              <AccountsTable />
            </Card>
          </Box>

          <Text className="text-gray-500  text-sm font-semibold">
            @ 2023 | Pixel8 Web Solutions
          </Text>
          <AddAccountModal add={add} toggle={addToggle.toggle} />
          <ScheduleModal open={time} toggle={timeToggle.toggle} />
        </>
      ) : (
        <Documentation />
      )}
    </>
  );
};

export default Home;
