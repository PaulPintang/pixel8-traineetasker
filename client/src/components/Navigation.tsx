import { Button, Flex, Group, Text, Avatar, Tooltip } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconLayoutDashboard,
  IconLayoutKanban,
  IconChecklist,
  IconCalendarStats,
  IconReport,
  IconClock,
} from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import avatar from "../assets/avatar.png";

const Navigation = () => {
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
            <Text c={pathname === "/tasks" ? "dark" : "gray"}>Manage Task</Text>
          </Button>
        </NavLink>

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
            <Text c={pathname === "/tasks" ? "dark" : "gray"}>Your Task</Text>
          </Button>
        </NavLink>
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
      </Group>
      <Group>
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
            Wednesday, June 07 2023
          </Text>
        </Group>
      </Group>
    </Flex>
  );
};

export default Navigation;
