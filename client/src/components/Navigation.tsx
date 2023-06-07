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
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Flex>
      <Group spacing={0}>
        <NavLink to="dashboard" className="text-gray-700">
          <Button
            leftIcon={<IconLayoutDashboard size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color="dark"
          >
            <Text>Dashboard</Text>
          </Button>
        </NavLink>
        <NavLink to="tasks" className="text-gray-700">
          <Button
            leftIcon={<IconChecklist size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color="dark"
          >
            Your Task
          </Button>
        </NavLink>
        <NavLink to="timesheet" className="text-gray-700">
          <Button
            leftIcon={<IconCalendarStats size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color="dark"
          >
            Timesheets
          </Button>
        </NavLink>
        <NavLink to="dtr" className="text-gray-700">
          <Button
            leftIcon={<IconReport size={18} />}
            size="xs"
            radius={0}
            variant="white"
            color="dark"
          >
            DTR
          </Button>
        </NavLink>
      </Group>
    </Flex>
  );
};

export default Navigation;
