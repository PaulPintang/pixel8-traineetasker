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
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import {
  useGetAllAccountQuery,
  useUpdateCourseViewMutation,
  useUpdateSupervisorMutation,
} from "../../features/api/account/accountApiSlice";
import { IAccount } from "../../interfaces/user.interface";
import { useGetAllTraineeQuery } from "../../features/api/trainee/traineeApiSlice";
import { useDisclosure } from "@mantine/hooks";
import ManageAccountModal from "./ManageAccountsModal";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor: "white",
    border: `${rem(1)} solid transparent`,
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      // transform: "scale(1.03)",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[1],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));

function AccordionContent({ name, picture, email }: IAccount) {
  return (
    <Group spacing={10}>
      <Avatar src={picture} radius="xl" size="sm" />
      <div>
        <Text size="sm">{name}</Text>
        <Text size="xs" color="dimmed" weight={400}>
          {email}
        </Text>
      </div>
    </Group>
  );
}

const MenuManageAccounts = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const { user } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const { data: accounts } = useGetAllAccountQuery();
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);
  const [courseView, viewState] = useUpdateCourseViewMutation();
  const [updateSupervisor, { isLoading }] = useUpdateSupervisorMutation();

  const updateAccount = async (_id: string) => {
    await updateSupervisor({ _id, email });
    setEmail("");
    close();
  };

  // ?? ADMIN CAN REASSIGN ACCOUNT SUPERVISOR
  const items = accounts?.map((account) => {
    // const total = trainees?.filter(
    //   (trainee) => trainee.course === item?.course
    // );
    return (
      <Accordion.Item
        value={account._id!}
        key={account.name}
        className="border -none"
        px={3}
        pt={4}
      >
        <Accordion.Control className="p-1" onClick={close}>
          <AccordionContent {...account} />
        </Accordion.Control>
        <Accordion.Panel>
          <Group spacing={10}>
            <Text fz={12} className="text-gray-500 font-semibold">
              Total Trainee's:
            </Text>
            <Text fz={12} c="dimmed">
              7
            </Text>
          </Group>
          <Group spacing={10}>
            <Text fz={12} className="text-gray-500 font-semibold">
              QA Personel:
            </Text>
            <Text fz={12} c="dimmed">
              Juan Dela Cruz
            </Text>
          </Group>
          <Group spacing={10}>
            <Text fz={12} className="text-gray-500 font-semibold">
              Task manager:
            </Text>
            <Text fz={12} c="dimmed">
              Justin Bieber
            </Text>
          </Group>
          {/* <Menu.Item className="bg-white hover:bg-white" p={0}> */}
          <Box maw={400} mx="auto">
            <Button
              onClick={toggle}
              leftIcon={<IconSettings size={17} />}
              variant="white"
              color="cyan"
              size="xs"
              pl={0}
              mt={6}
              compact
            >
              Change account
            </Button>
            <Collapse in={opened}>
              <TextInput
                size="xs"
                placeholder="email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Flex justify="flex-end" pt={10}>
                <Button
                  size="xs"
                  onClick={() => updateAccount(account._id!)}
                  loading={isLoading}
                >
                  Save
                </Button>
              </Flex>
            </Collapse>
          </Box>
          {/* </Menu.Item> */}
        </Accordion.Panel>
      </Accordion.Item>
    );
  });

  return (
    <Menu shadow="md" position="bottom-end" closeOnItemClick withArrow>
      <Menu.Target>
        <ActionIcon variant="light" radius="xl">
          <IconUsers size={17} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className="pb-3 px-3">
        <Accordion
          variant="filled"
          defaultValue="customization"
          classNames={classes}
          className={classes.root}
          chevronPosition="right"
        >
          {items}
        </Accordion>
      </Menu.Dropdown>
      {/* <ManageAccountModal opened={opened} toggle={toggle} /> */}
    </Menu>
  );
};

export default MenuManageAccounts;
