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
  Divider,
} from "@mantine/core";
import { createStyles } from "@mantine/core";
import {
  IconSelector,
  IconCheck,
  IconClock,
  IconUsers,
} from "@tabler/icons-react";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import {
  useGetAllAccountQuery,
  useUpdateCourseViewMutation,
} from "../../features/api/account/accountApiSlice";
import { IAccount } from "../../interfaces/user.interface";

// const charactersList = [
//   {
//     id: "bender",
//     image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
//     name: "Bender Bending Rodríguez",
//     email: "email@gmail.com",
//     content: "Bender Bending Rodríguez",
//   },

//   {
//     id: "carol",
//     image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
//     name: "Carol Miller",
//     email: "email@gmail.com",

//     content: "Carol Miller (born January 30, 2880) ",
//   },
//   {
//     id: "carols",
//     image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
//     name: "Carol Milledasdasdr",
//     email: "email@gmail.com",

//     content: "Carol Miller (born January 30, 2880) ",
//   },
// ];

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

function Accordionname({ name, picture, email }: IAccount) {
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
  const { classes } = useStyles();
  const { data: accounts } = useGetAllAccountQuery();
  const [courseView, viewState] = useUpdateCourseViewMutation();
  const { user } = useAppSelector((state) => state.auth);

  const items = accounts?.map((item) => (
    <Accordion.Item
      value={item._id!}
      key={item.name}
      className="border -none"
      px={3}
      pt={4}
    >
      <Accordion.Control className="p-1">
        <Accordionname {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <Text size="xs">{item.course}</Text>
      </Accordion.Panel>
    </Accordion.Item>
  ));

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
        {/* <Button size="xs" fullWidth>
          Save
        </Button> */}
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuManageAccounts;
