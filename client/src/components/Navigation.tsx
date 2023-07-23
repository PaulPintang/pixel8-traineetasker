import { Button, Flex, Group, Text } from "@mantine/core";
import {
  IconLayoutDashboard,
  IconChecklist,
  IconCalendarStats,
  IconReport,
} from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { formatDateTime } from "../utils/formatDateTime";

const Navigation = () => {
  const date = new Date();
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { pathname } = location;

  return (
    <Flex justify="space-between" align="center">
      <Group spacing={0}>
        <NavLink to="dashboard" className="text-gray-700">
          <Button
            leftIcon={<IconLayoutDashboard size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color={pathname === "/dashboard" ? "dark" : "gray"}
            className={`${
              pathname === "/dashboard" ? "bg-slate-50 bg-opacity-30" : ""
            }`}
          >
            <Text c={pathname === "/dashboard" ? "dark" : "gray"}>
              Dashboard
            </Text>
          </Button>
        </NavLink>

        {user?.role !== "admin" && (
          <NavLink to="tasks" className="text-gray-700">
            <Button
              leftIcon={<IconChecklist size={18} />}
              size="xs"
              radius={0}
              variant="white"
              color={pathname === "/tasks" ? "dark" : "gray"}
              className={`${
                pathname === "/tasks" ? "bg-slate-50 bg-opacity-30" : ""
              }`}
            >
              <Text c={pathname === "/tasks" ? "dark" : "gray"}>
                {user?.role === "trainee" ? "Your Task" : "ManageTask"}
              </Text>
            </Button>
          </NavLink>
        )}

        {user?.role === "trainee" && (
          <>
            <NavLink to="timesheet" className="text-gray-700">
              <Button
                leftIcon={<IconCalendarStats size={18} />}
                size="xs"
                radius={0}
                variant="white"
                color={pathname === "/timesheet" ? "dark" : "gray"}
                className={`${
                  pathname === "/timesheet" ? "bg-slate-50 bg-opacity-30" : ""
                }`}
              >
                <Text c={pathname === "/timesheet" ? "dark" : "gray"}>
                  Timesheets
                </Text>
              </Button>
            </NavLink>
            <NavLink to="dtr" className="text-gray-700">
              <Button
                leftIcon={<IconReport size={18} />}
                size="xs"
                radius={0}
                variant="white"
                color={pathname === "/dtr" ? "dark" : "gray"}
                className={`${
                  pathname === "/dtr" ? "bg-slate-50 bg-opacity-30" : ""
                }`}
              >
                <Text c={pathname === "/dtr" ? "dark" : "gray"}>DTR</Text>
              </Button>
            </NavLink>
          </>
        )}
      </Group>
      <Group className="hidden md:flex lg:flex">
        <Group spacing={10}>
          <Text fz="xs" className="text-gray-800 font-semibold">
            Schedule:
          </Text>
          <Text fz="xs" c="dimmed">
            8:00 AM - 5:00 PM
          </Text>
        </Group>
        <Group spacing={10}>
          <Text fz="xs" className="text-gray-800 font-semibold">
            Today:
          </Text>
          <Text fz="xs" c="dimmed">
            {formatDateTime().date}
          </Text>
        </Group>
      </Group>
    </Flex>
  );
};

export default Navigation;
