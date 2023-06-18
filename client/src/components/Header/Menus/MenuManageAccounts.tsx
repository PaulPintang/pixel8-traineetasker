import {
  Flex,
  Menu,
  Button,
  Text,
  Stack,
  Badge,
  Loader,
  ActionIcon,
  Group,
  Accordion,
  Avatar,
  rem,
  Box,
  Collapse,
  Divider,
  TextInput,
} from "@mantine/core";
import { createStyles } from "@mantine/core";
import {
  IconSelector,
  IconCheck,
  IconClock,
  IconUsers,
  IconUser,
  IconUserCircle,
  IconSettings,
} from "@tabler/icons-react";
import { useAppSelector } from "../../../app/hooks";
import { useState, lazy } from "react";
import {
  useGetAllAccountQuery,
  useUpdateCourseViewMutation,
  useUpdateSupervisorMutation,
} from "../../../features/api/account/accountApiSlice";
import { IAccount } from "../../../interfaces/user.interface";
import { useGetAllTraineeQuery } from "../../../features/api/trainee/traineeApiSlice";
import { useDisclosure } from "@mantine/hooks";
import ManageAccountModal from "./AccountsDropdown";
import AccountsDropdown from "./AccountsDropdown";
const AccordionDropdown = lazy(() => import("./AccordionDropdown"));

const MenuManageAccounts = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { user } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const { data: accounts } = useGetAllAccountQuery();
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);
  const [courseView, viewState] = useUpdateCourseViewMutation();

  return (
    <Menu shadow="md" position="bottom-end" closeOnItemClick withArrow>
      <Menu.Target>
        <ActionIcon variant="light" radius="xl">
          <IconUsers size={17} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className="px-3 pb-2">
        {/* <AccordionDropdown /> */}
        {user?.role !== "admin" ? <AccountsDropdown /> : <AccordionDropdown />}
      </Menu.Dropdown>
      {/* <ManageAccountModal opened={opened} toggle={toggle} /> */}
    </Menu>
  );
};

export default MenuManageAccounts;
