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
import {
  useGetAllTasksQuery,
  useTodoTaskMutation,
} from "../../../features/api/task/taskApiSlice";
import { useGetTraineeProfileQuery } from "../../../features/api/trainee/traineeApiSlice";
import { useState, useEffect, useMemo } from "react";

type Todo = {
  isDone: boolean;
  todo: string;
};

const TasksTodoCard = () => {
  const { data: tasks } = useGetAllTasksQuery();
  const { data: trainee } = useGetTraineeProfileQuery();
  const [taskTodo] = useTodoTaskMutation();

  const [add, { toggle }] = useDisclosure();
  const currentTask = tasks?.find((task) => task.status === "inprogress");

  const removeTodo = async (index: number) => {
    await taskTodo({
      _id: currentTask?._id,
      todos: currentTask?.todos?.filter((link, i) => i !== index),
    });
    // setTodos(res.data);
  };

  const isTodoDone = async (index: number) => {
    const updatedTodos = currentTask?.todos?.map((todo, i) => {
      if (i === index) {
        return { ...todo, isDone: !todo.isDone }; // Toggle the isDone property
      }
      return todo;
    });

    await taskTodo({
      _id: currentTask?._id,
      todos: updatedTodos,
    });

    // setTodos(res.data);
  };

  return (
    <>
      <Card className="h-full rounded-md shadow-md ">
        {currentTask?.todos?.length !== 0 ? (
          <>
            <Group spacing={10} pb={5}>
              <Text fz="sm" className="text-gray-500 font-semibold">
                Current Task:
              </Text>
              <Text fz="sm" c="dimmed">
                {currentTask?.taskname}
              </Text>
            </Group>
            <Flex align="center" justify="space-between" pb={3}>
              <Text fz="xs" className="text-gray-500 font-semibold">
                You've got {currentTask?.todos?.length} todos for this task
              </Text>
              <Button size="xs" variant="white" onClick={toggle}>
                + Add more
              </Button>
            </Flex>
            <ScrollArea.Autosize mah={220} scrollbarSize={8}>
              <div className="space-y-3 ">
                {currentTask?.todos?.map((todo, index) => (
                  <div className="bg-slate-50 opacity-70 px-3 py-2 rounded-md relative">
                    <Text c="dark" fz="xs" className="w-[80%]" py={4}>
                      <span
                        className={todo.isDone ? "line-through italic" : ""}
                      >
                        {todo.todo}
                      </span>
                    </Text>
                    <div className="absolute top-2 right-3">
                      <Group spacing={6}>
                        <Checkbox
                          checked={todo.isDone}
                          size="xs"
                          color="cyan"
                          onChange={() => isTodoDone(index)}
                        />
                        <ActionIcon
                          color="red"
                          variant="light"
                          radius="xl"
                          onClick={() => removeTodo(index)}
                        >
                          <IconX size={15} />
                        </ActionIcon>
                      </Group>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea.Autosize>
          </>
        ) : (
          <Flex direction="column" align="center" gap={10}>
            <Image src={empty} width={130} />
            <Text fw="bold" c="dark">
              Don't have any new todo?
            </Text>
            <Button size="sm" color="cyan" onClick={toggle}>
              Add todos
            </Button>
          </Flex>
        )}
      </Card>
      <AddTodoModal add={add} toggle={toggle} currentTask={currentTask!} />
    </>
  );
};

export default TasksTodoCard;
