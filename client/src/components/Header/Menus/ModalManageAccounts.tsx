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
  ActionIcon,
  CloseButton,
} from "@mantine/core";
import avatar from "../../../assets/avatar.png";
import {
  IconCheck,
  IconPlus,
  IconSelector,
  IconTrash,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import {
  useAddAccountMutation,
  useDeleteAccountMutation,
  useGetAllAccountQuery,
  useUpdateAccountMutation,
} from "../../../features/api/account/accountApiSlice";
import { useAppSelector } from "../../../app/hooks";
import EmptyState from "../../EmptyState";

const ModalManageAccounts = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [collapse, collapseView] = useDisclosure(false);
  const [modal, modalView] = useDisclosure(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [selectRole, setSelectRole] = useState("QA Personnel");
  const [addAccount, { isLoading }] = useAddAccountMutation();
  const [deleteAccount, deleteState] = useDeleteAccountMutation();
  const [updateAccount, updateState] = useUpdateAccountMutation();
  const { data: accounts } = useGetAllAccountQuery();

  const members = accounts?.filter((account) => account.name !== "");
  const invites = accounts?.filter((account) => account.name === "");

  const handleAddAccount = async () => {
    const res: any = await addAccount({
      name: "",
      email,
      course: user?.course,
      newrole: selectRole,
    });

    if (res.error) {
      setError(true);
      return;
    }
    collapseView.toggle();
    setEmail("");
  };

  const handleDeleteAccount = async (_id: string) => {
    await deleteAccount({ _id });
  };

  const handleChangeRole = async (_id: string, role: any) => {
    setSelectRole(role);
    await updateAccount({ _id, role });
  };

  return (
    <>
      <ActionIcon variant="light" radius="xl" onClick={modalView.toggle}>
        <IconUsers size={17} />
      </ActionIcon>
      <Modal
        opened={modal}
        onClose={() => {
          collapseView.close();
          modalView.close();
          setEmail("");
        }}
        withCloseButton={false}
        centered
      >
        <div>
          {/* <div className="h-[140px]"> */}
          <Flex justify="space-between" align="center">
            <Text>System Accounts</Text>
            <Group spacing={5}>
              {!collapse && (
                <Button
                  onClick={collapseView.toggle}
                  variant="white"
                  color="cyan"
                  pl={0}
                  compact
                >
                  Invite
                </Button>
              )}
              <CloseButton
                onClick={() => {
                  modalView.close();
                  collapseView.close();
                  setEmail("");
                }}
              />
            </Group>
          </Flex>
          <Stack spacing={9} py={15}>
            {members?.length !== 0 && (
              <>
                <Text fz="sm" fw="bold">
                  Members
                </Text>
                {members?.map((account) => (
                  <Flex
                    key={account._id}
                    justify="space-between"
                    align="center"
                  >
                    <Group spacing={10}>
                      <Image
                        src={account.picture}
                        width={35}
                        radius="xl"
                        imageProps={{ referrerPolicy: "no-referrer" }}
                      />
                      <div className="-space-y-[2px]">
                        <Text size="sm">{account.name}</Text>
                        <Text
                          c="dimmed"
                          size="xs"
                          className="truncate w-[200px]"
                        >
                          {account.email}
                        </Text>
                      </div>
                    </Group>
                    <Group spacing={5}>
                      <Menu
                        shadow="md"
                        position="bottom"
                        closeOnItemClick
                        width={121}
                      >
                        <Menu.Target>
                          <Button
                            rightIcon={<IconSelector size={15} />}
                            variant="light"
                            size="xs"
                            color="gray"
                          >
                            <Text c="dark">{account.role}</Text>
                          </Button>
                        </Menu.Target>
                        <Menu.Dropdown className="px-2">
                          <Flex
                            direction="column"
                            justify="flex-start"
                            align="start"
                          >
                            <Button
                              variant="white"
                              size="xs"
                              color="gray"
                              px={0}
                              rightIcon={
                                updateState.isLoading &&
                                selectRole === "Task manager" ? (
                                  <Loader size={16} color="gray" />
                                ) : (
                                  selectRole === "Task manager" && (
                                    <IconCheck size={16} />
                                  )
                                )
                              }
                              onClick={() =>
                                handleChangeRole(account._id!, "Task manager")
                              }
                            >
                              Task manager
                            </Button>
                            <Button
                              variant="white"
                              size="xs"
                              color="gray"
                              px={0}
                              rightIcon={
                                updateState.isLoading &&
                                selectRole === "QA Personnel" ? (
                                  <Loader size={16} color="gray" />
                                ) : (
                                  selectRole === "QA Personnel" && (
                                    <IconCheck size={16} />
                                  )
                                )
                              }
                              onClick={() =>
                                handleChangeRole(account._id!, "QA Personnel")
                              }
                            >
                              QA Personnel
                            </Button>
                          </Flex>
                        </Menu.Dropdown>
                      </Menu>
                      <ActionIcon
                        color="red"
                        onClick={() => handleDeleteAccount(account._id!)}
                        loading={
                          deleteState.isLoading &&
                          deleteState.originalArgs._id === account._id
                        }
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Flex>
                ))}
              </>
            )}
            {invites?.length !== 0 && (
              <>
                <Text fz="sm" fw="bold" pt={10}>
                  Pending invitation
                </Text>
                {invites?.map((account) => (
                  <>
                    <Flex justify="space-between" align="center">
                      <Group spacing={10}>
                        <Image
                          src={avatar}
                          width={35}
                          radius="xl"
                          imageProps={{ referrerPolicy: "no-referrer" }}
                        />
                        <div className="-space-y-[2px]">
                          <Text c="dimmed" size="sm">
                            {account.email}
                          </Text>
                          <Text size="xs" fw="bold">
                            as {account.role}
                          </Text>
                        </div>
                      </Group>
                      <Group spacing={5}>
                        <Button
                          variant="white"
                          size="xs"
                          color="gray"
                          onClick={() => handleDeleteAccount(account._id!)}
                          loading={
                            deleteState.isLoading &&
                            deleteState.originalArgs._id === account._id
                          }
                        >
                          <Text c="gray">Cancel</Text>
                        </Button>
                      </Group>
                    </Flex>
                  </>
                ))}
              </>
            )}
            {accounts?.length === 0 && !collapse && (
              // <Text fw="bold" c="dimmed" className="text-center" pt={20}>
              //   No accounts found!
              // </Text>
              <div className="h-[160px] relative top-6">
                <EmptyState text="No accounts found" />
              </div>
            )}

            <Flex>
              <Box className="w-full">
                <Collapse in={collapse}>
                  <Flex justify="space-betwe en" gap={10} pt={10}>
                    <TextInput
                      // size="xs"
                      placeholder="email here"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError(false);
                      }}
                      className="w-full"
                      error={error && "Invalid email or email already exist"}
                      rightSection={
                        email !== "" && (
                          <IconX
                            size={15}
                            onClick={() => {
                              setEmail("");
                              setError(false);
                            }}
                            className="hover:cursor-pointer"
                          />
                        )
                      }
                    />
                    <Menu
                      shadow="md"
                      position="bottom"
                      width={123}
                      closeOnItemClick
                    >
                      <Menu.Target>
                        <Button
                          rightIcon={<IconSelector size={15} />}
                          variant="light"
                          // size="xs"
                          color="gray"
                          className="w-[185px]"
                          // loading={viewState.isLoading}
                        >
                          <Text c="dark" fz="xs">
                            {selectRole}
                          </Text>
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown className="px-2 absolute overflow-visible">
                        <Menu.Item className="bg-white hover:bg-white p-0">
                          <Flex
                            direction="column"
                            justify="flex-start"
                            align="start"
                          >
                            <Button
                              variant="white"
                              size="xs"
                              color="gray"
                              px={0}
                              onClick={() => setSelectRole("Task manager")}
                              rightIcon={
                                selectRole === "Task manager" && (
                                  <IconCheck size={16} />
                                )
                              }
                            >
                              Task manager
                            </Button>
                            <Button
                              variant="white"
                              size="xs"
                              color="gray"
                              px={0}
                              onClick={() => setSelectRole("QA Personnel")}
                              rightIcon={
                                selectRole === "QA Personnel" && (
                                  <IconCheck size={16} />
                                )
                              }
                            >
                              QA Personnel
                            </Button>
                          </Flex>
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Flex>
                  <Text fz="sm" c="dimmed" pt={14}>
                    Note that you can only add new email address if it is not
                    already associated with another course.
                  </Text>
                  {email.length >= 20 && email.includes("@gmail") && (
                    <Flex justify="flex-end" gap={10} pt={14}>
                      <Button
                        variant="white"
                        color="gray"
                        // size="xs"
                        onClick={() => {
                          collapseView.toggle();
                          setEmail("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        // size="xs"
                        onClick={handleAddAccount}
                        loading={isLoading}
                        color="cyan"
                      >
                        Invite
                      </Button>
                    </Flex>
                  )}
                </Collapse>
              </Box>
            </Flex>
          </Stack>
        </div>
      </Modal>
    </>
  );
};

export default ModalManageAccounts;
