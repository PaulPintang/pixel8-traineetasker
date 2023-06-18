import {
  Modal,
  Title,
  Text,
  Flex,
  Button,
  TextInput,
  Image,
  Group,
  Stack,
  Select,
  Menu,
  Loader,
  Collapse,
  Box,
} from "@mantine/core";
import avatar from "../../../assets/avatar.png";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

const AccountsDropdown = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [email, setEmail] = useState("");
  return (
    <Stack spacing={7} w={350} p={8}>
      <Flex justify="space-between" align="center">
        <Group spacing={10}>
          <Image
            src={avatar}
            width={35}
            radius="xl"
            imageProps={{ referrerPolicy: "no-referrer" }}
          />
          <div className="-space-y-[2px]">
            <Text size="sm">Juan Dela Cruz</Text>
            <Text c="dimmed" size="xs">
              juandelacruz@gmail.com
            </Text>
          </div>
        </Group>
        <div className="">
          <Menu shadow="md" position="bottom" closeOnItemClick width={121}>
            <Menu.Target>
              <Button
                rightIcon={<IconSelector size={15} />}
                variant="light"
                size="xs"
                color="gray"
                // loading={viewState.isLoading}
              >
                <Text c="dark">QA Personnel</Text>
              </Button>
            </Menu.Target>
            <Menu.Dropdown className="p-2">
              <Flex direction="column" justify="flex-start" align="start">
                <Button
                  variant="white"
                  size="xs"
                  color="gray"
                  px={0}
                  rightIcon={<IconCheck size={16} />}
                >
                  Task manager
                </Button>
                <Button
                  variant="white"
                  size="xs"
                  color="gray"
                  px={0}
                  rightIcon={<Loader size={15} color="gray" />}
                >
                  QA Personnel
                </Button>
              </Flex>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Flex>
      <Flex>
        <Box className="w-full">
          <Button
            onClick={toggle}
            variant="white"
            color="cyan"
            size="xs"
            pl={0}
            mt={6}
            compact
          >
            + Add account
          </Button>
          <Collapse in={opened}>
            <Flex justify="space-betwe en" gap={10} pt={10}>
              <TextInput
                size="xs"
                placeholder="email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <Menu shadow="md" position="bottom" width={123}>
                <Menu.Target>
                  <Button
                    rightIcon={<IconSelector size={15} />}
                    variant="light"
                    size="xs"
                    color="gray"
                    className="w-[194px]"
                    // loading={viewState.isLoading}
                  >
                    <Text c="dark">Task manager</Text>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown className="p-2">
                  <Flex direction="column" justify="flex-start" align="start">
                    <Button variant="white" size="xs" color="gray" px={0}>
                      Task manager
                    </Button>
                    <Button variant="white" size="xs" color="gray" px={0}>
                      QA Personnel
                    </Button>
                  </Flex>
                </Menu.Dropdown>
              </Menu>
            </Flex>
            <Flex justify="flex-end" gap={10} pt={14}>
              <Button variant="white" color="gray" size="xs">
                Cancel
              </Button>
              <Button size="xs">Add</Button>
            </Flex>
          </Collapse>
        </Box>
      </Flex>
    </Stack>
  );
};

export default AccountsDropdown;
