import {
  Modal,
  TextInput,
  Button,
  Group,
  Flex,
  Text,
  ActionIcon,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { ITask } from "../../../interfaces/task.interface";
import { useTodoTaskMutation } from "../../../features/api/task/taskApiSlice";
import { useMediaQuery } from "@mantine/hooks";
import ToastNotify from "../../../components/ToastNotify";

interface ModalProps {
  currentTask: ITask;
  add: boolean;
  toggle: () => void;
}

type Todo = {
  isDone: boolean;
  todo: string;
};

const AddTodoModal = ({ add, toggle, currentTask }: ModalProps) => {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [todo, setTodo] = useState<Todo>({
    isDone: false,
    todo: "",
  });
  const [addedTodos, setAddedTodos] = useState<Todo[]>([]);
  const [addTodo, { isLoading }] = useTodoTaskMutation();

  const handleAddTodo = () => {
    setAddedTodos([...addedTodos, todo]);
    setTodo({ ...todo, todo: "" });
  };

  const handleSaveTodo = async () => {
    const todos = [...currentTask.todos!, ...addedTodos];
    await addTodo({ _id: currentTask._id, todos });
    toggle();
    setTodo({ ...todo, todo: "" });
    setAddedTodos([]);
    ToastNotify(`New todo added to your in-progress task`, "success");
  };

  return (
    <Modal
      size="sm"
      opened={add}
      fullScreen={isMobile}
      onClose={() => {
        toggle();
        setTodo({ ...todo, todo: "" });
        setAddedTodos([]);
      }}
      title={
        <Text c="dark" fz="sm">
          Add todo's to your current task!
        </Text>
      }
    >
      <div className="space-y-1">
        <Group spacing={10} pb={3}>
          <Text fz={12} className="text-gray-500 font-semibold">
            Current Task:
          </Text>
          <Text fz={12} c="dimmed">
            {currentTask?.taskname}
          </Text>
        </Group>

        <Flex gap={8}>
          <TextInput
            autoComplete="off"
            placeholder="add todo"
            name="taskname"
            value={todo.todo}
            onChange={(e) => setTodo({ ...todo, todo: e.target.value })}
            className="w-full"
          />
          <Button
            onClick={handleAddTodo}
            size="sm"
            disabled={todo.todo === "" ? true : false}
          >
            Add
          </Button>
        </Flex>
      </div>

      <div className="space-y-2 py-3">
        {addedTodos.map((todo, index) => (
          <div key={index}>
            <div className="bg-slate-50 opacity-70 px-3 py-2 rounded-md relative">
              <Text c="dark" fz="sm" className="w-[80%]" py={4}>
                {todo.todo}
              </Text>
              <div className="absolute top-2 right-3">
                <ActionIcon
                  color="red"
                  variant="light"
                  radius="xl"
                  onClick={() =>
                    setAddedTodos((prev) =>
                      prev.filter((link, i) => i !== index)
                    )
                  }
                >
                  <IconX size={16} />
                </ActionIcon>
              </div>
            </div>
          </div>
        ))}
      </div>

      {addedTodos.length !== 0 && (
        <Flex>
          <Button
            variant="white"
            color="gray"
            mt="md"
            onClick={() => {
              toggle();
              setTodo({ ...todo, todo: "" });
              setAddedTodos([]);
            }}
            fullWidth
          >
            Cancel
          </Button>

          <Button
            mt="md"
            onClick={handleSaveTodo}
            fullWidth
            color="cyan"
            loading={isLoading}
          >
            Save
          </Button>
        </Flex>
      )}
    </Modal>
  );
};

export default AddTodoModal;
