import {
  Button,
  Flex,
  Group,
  Text,
  Avatar,
  Tooltip,
  ScrollArea,
} from "@mantine/core";
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
import { useAppSelector } from "../app/hooks";
import { formatDateTime } from "../utils/formatDateTime";

const Navigation = () => {
  const date = new Date();
  const format = formatDateTime(date);
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const { pathname } = location;

  return (
    <Flex justify="space-between" align="center">
      {/* <ScrollArea w={340} className="bg-red-400"> */}
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
      {/* </ScrollArea> */}
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
            {format.date}
          </Text>
        </Group>
      </Group>
    </Flex>
  );
};

export default Navigation;
