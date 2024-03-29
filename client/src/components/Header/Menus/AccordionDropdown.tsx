import {
  rem,
  Accordion,
  Group,
  Text,
  Flex,
  Avatar,
  Button,
  Collapse,
  Box,
  TextInput,
} from "@mantine/core";
import { createStyles } from "@mantine/core";
import {
  useGetAllAccountQuery,
  useUpdateAccountMutation,
} from "../../../features/api/account/accountApiSlice";
import { useState } from "react";
import { IconSettings } from "@tabler/icons-react";
import { IAccount } from "../../../interfaces/user.interface";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllTraineeQuery } from "../../../features/api/trainee/traineeApiSlice";
import { useAppSelector } from "../../../app/hooks";

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

const AccordionDropdown = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { classes } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);

  const [updateAccount, { isLoading }] = useUpdateAccountMutation();
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);

  const { data: accounts } = useGetAllAccountQuery();
  const [email, setEmail] = useState("");

  const handleUpdateAccount = async (_id: string) => {
    await updateAccount({ _id, email });
    setEmail("");
    close();
  };

  const items = accounts
    ?.filter((acc) => acc.role === "supervisor")
    .map((account) => {
      return (
        <Accordion.Item
          value={account._id!}
          key={account.name}
          className="border -none"
          p={3}
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
                {
                  trainees?.filter(
                    (trainee) => trainee.course === account.course
                  ).length
                }
              </Text>
            </Group>
            <Group spacing={10}>
              <Text fz={12} className="text-gray-500 font-semibold">
                QA Personnel:
              </Text>
              <Text fz={12} c="dimmed">
                {
                  accounts.filter(
                    (acc) =>
                      acc.role === "QA Personnel" &&
                      account.course === acc.course
                  ).length
                }
              </Text>
            </Group>
            <Group spacing={10}>
              <Text fz={12} className="text-gray-500 font-semibold">
                Task manager:
              </Text>
              <Text fz={12} c="dimmed">
                {
                  accounts.filter(
                    (acc) =>
                      acc.role === "Task manager" &&
                      account.course === acc.course
                  ).length
                }
              </Text>
            </Group>
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
                    onClick={() => handleUpdateAccount(account._id!)}
                    loading={isLoading}
                  >
                    Save
                  </Button>
                </Flex>
              </Collapse>
            </Box>
          </Accordion.Panel>
        </Accordion.Item>
      );
    });

  return (
    <Accordion
      variant="filled"
      defaultValue="customization"
      classNames={classes}
      className={classes.root}
      chevronPosition="right"
    >
      {items}
    </Accordion>
  );
};

export default AccordionDropdown;
