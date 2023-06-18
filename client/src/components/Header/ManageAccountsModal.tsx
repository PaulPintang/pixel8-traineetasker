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
} from "@mantine/core";
import avatar from "../../assets/avatar.png";
import { IconSelector } from "@tabler/icons-react";

interface ModalProps {
  opened: boolean;
  toggle: () => void;
}

const ManageAccountModal = ({ opened, toggle }: ModalProps) => {
  return (
    <>
      <Modal
        opened={opened}
        size={350}
        onClose={toggle}
        centered
        withCloseButton={false}
      >
        <Stack h={200}>
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
              <Menu shadow="md" position="bottom" closeOnItemClick>
                <Menu.Target>
                  <Button
                    rightIcon={<IconSelector size={15} />}
                    variant="light"
                    size="xs"
                    color="gray"
                    // loading={viewState.isLoading}
                  >
                    {/* Software Development */}
                    <Text c="dark">admin</Text>
                  </Button>
                </Menu.Target>
                <Menu.Dropdown className="p-2">
                  <Flex direction="column" justify="flex-start" align="start">
                    <Button variant="white" size="xs" color="dark" px={0}>
                      Admin
                    </Button>
                    <Button variant="white" size="xs" color="dark" px={0}>
                      Supervisor
                    </Button>
                    <Button variant="white" size="xs" color="dark" px={0}>
                      QA Personnel
                    </Button>
                  </Flex>
                </Menu.Dropdown>
              </Menu>
            </div>
          </Flex>
        </Stack>
      </Modal>
    </>
  );
};

export default ManageAccountModal;
