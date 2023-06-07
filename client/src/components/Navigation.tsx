import { Button, Flex, Group, Text } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconLayoutDashboard,
  IconLayoutKanban,
  IconChecklist,
  IconCalendarStats,
  IconReport,
} from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Flex>
      <Group spacing={0}>
        <NavLink to="dashboard" className="text-gray-700">
          <Button
            leftIcon={<IconLayoutDashboard size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color={pathname === "/dashboard" ? "dark" : "gray"}
          >
            <Text c={pathname === "/dashboard" ? "dark" : ""}>Dashboard</Text>
          </Button>
        </NavLink>
        <NavLink to="tasks" className="text-gray-700">
          <Button
            leftIcon={<IconChecklist size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color={pathname === "/tasks" ? "dark" : "gray"}
          >
            <Text c={pathname === "/tasks" ? "dark" : ""}>Your Task</Text>
          </Button>
        </NavLink>
        <NavLink to="timesheet" className="text-gray-700">
          <Button
            leftIcon={<IconCalendarStats size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color={pathname === "/timesheet" ? "dark" : "gray"}
          >
            <Text c={pathname === "/timesheet" ? "dark" : ""}>Timesheets</Text>
          </Button>
        </NavLink>
        <NavLink to="dtr" className="text-gray-700">
          <Button
            leftIcon={<IconReport size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color={pathname === "/dtr" ? "dark" : "gray"}
          >
            <Text c={pathname === "/dtr" ? "dark" : ""}>DTR</Text>
          </Button>
        </NavLink>
      </Group>
    </Flex>
  );
};

export default Navigation;
