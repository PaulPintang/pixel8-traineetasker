import {
  Flex,
  Menu,
  Button,
  Text,
  Stack,
  Badge,
  Loader,
  Group,
  ActionIcon,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconSelector, IconCheck, IconClock } from "@tabler/icons-react";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { useUpdateCourseViewMutation } from "../../features/api/account/accountApiSlice";

const MenuEditSchedule = () => {
  const [courseView, viewState] = useUpdateCourseViewMutation();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Menu
      width={260}
      shadow="md"
      position="bottom-end"
      closeOnItemClick
      withArrow
    >
      <Menu.Target>
        <ActionIcon variant="light" radius="xl">
          <IconClock size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className="p-3">
        <Group grow pb={12}>
          <div>
            <Text c="dimmed" fw="bold" fz="sm">
              Start time
            </Text>
            <TimeInput size="xs" icon={<IconClock size="1rem" />} />
          </div>
          <div>
            <Text c="dimmed" fw="bold" fz="sm">
              End time
            </Text>
            <TimeInput size="xs" icon={<IconClock size="1rem" />} />
          </div>
        </Group>
        <Button size="xs" fullWidth>
          Save
        </Button>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuEditSchedule;
