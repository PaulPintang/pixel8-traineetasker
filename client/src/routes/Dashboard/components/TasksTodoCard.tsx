import {
  Card,
  Center,
  Image,
  Text,
  Button,
  Box,
  Flex,
  Group,
  ActionIcon,
  ScrollArea,
  Checkbox,
  Tooltip,
} from "@mantine/core";
import empty from "../../../assets/emptytodo.png";
import AddTodoModal from "./AddTodoModal";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";

const TasksTodoCard = () => {
  const { data: tasks } = useGetAllTasksQuery();
  const [add, { toggle }] = useDisclosure();
  const todos = tasks
    ?.filter((task) => task.status === "inprogress")
    .map((task) => task.todos);
  return (
    <>
      <Card className="h-full rounded-md shadow-md ">
        {/* <Flex direction="column" align="center" gap={10}>
          <Image src={empty} width={130} />
          <Text fw="bold" c="dark">
            Don't have any new todo?
          </Text>
          <Button size="sm" color="cyan" onClick={toggle}>
            Add todos
          </Button>
        </Flex> */}
        <>
          <Group spacing={10} pb={5}>
            <Text fz="sm" className="text-gray-500 font-semibold">
              Current Task:
            </Text>
            <Text fz="sm" c="dimmed">
              Dashboard Page
            </Text>
          </Group>
          <Flex align="center" justify="space-between" pb={3}>
            <Text fz="xs" className="text-gray-500 font-semibold">
              You've got 10 todos for this task
            </Text>
            <Button size="xs" variant="white" onClick={toggle}>
              + Add more
            </Button>
          </Flex>
          <ScrollArea.Autosize mah={220} scrollbarSize={8}>
            <div className="space-y-3 ">
              {todos?.map((todo) => (
                <div className="bg-slate-50 opacity-70 px-3 py-2 rounded-md relative">
                  <Text c="dark" fz="xs" className="w-[80%]" py={4}>
                    {todo}
                  </Text>
                  <div className="absolute top-2 right-3">
                    <Group spacing={6}>
                      <Checkbox size="xs" color="cyan" />
                      <ActionIcon color="red" variant="light" radius="xl">
                        <IconX size={15} />
                      </ActionIcon>
                    </Group>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea.Autosize>
        </>
      </Card>
      <AddTodoModal add={add} toggle={toggle} />
    </>
  );
};

export default TasksTodoCard;
