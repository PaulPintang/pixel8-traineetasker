import {
  Modal,
  TextInput,
  Button,
  Group,
  Flex,
  Card,
  Text,
  Select,
  ActionIcon,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

interface ModalProps {
  add: boolean;
  toggle: () => void;
}

interface ModalProps {
  add: boolean;
  toggle: () => void;
}

const AddTodoModal = ({ add, toggle }: ModalProps) => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = () => {
    setTodos([...todos, todo]);
    setTodo("");
  };

  return (
    <Modal
      size="sm"
      opened={add}
      onClose={() => {
        toggle();
        setTodo("");
        setTodos([]);
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
            Dashboard Page
          </Text>
        </Group>

        <Flex gap={8}>
          <TextInput
            autoComplete="off"
            placeholder="add todo"
            name="taskname"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="w-full"
          />
          <Button
            onClick={handleAddTodo}
            size="sm"
            disabled={todo === "" ? true : false}
          >
            Add
          </Button>
        </Flex>
      </div>

      <div className="space-y-2 py-3">
        {todos.map((todo, index) => (
          <div>
            <div className="bg-slate-50 opacity-70 px-3 py-2 rounded-md relative">
              <Text c="dark" fz="sm" className="w-[80%]" py={4}>
                {todo}
              </Text>
              <div className="absolute top-2 right-3">
                <ActionIcon
                  color="red"
                  variant="light"
                  radius="xl"
                  onClick={() =>
                    setTodos((prev) => prev.filter((link, i) => i !== index))
                  }
                >
                  <IconX size={16} />
                </ActionIcon>
              </div>
            </div>
          </div>
          //    <div className="space-y-3 ">
          //       <div className="bg-slate-50 opacity-70 px-3 py-2 rounded-md relative">
          //         <Text c="dark" fz="xs" className="w-[80%]" py={4}>
          //           I motice a problem in mobile device where dasd Lorem ipsum
          //           dolor sit amet consectetur adipisicing elit. Doloremque,
          //           vitae.
          //         </Text>
          //         <div className="absolute top-2 right-3">
          //           <Group spacing={6}>
          //             <Checkbox size="xs" color="cyan" />
          //             <ActionIcon color="red" variant="light" radius="xl">
          //               <IconX size={15} />
          //             </ActionIcon>
          //           </Group>
          //         </div>
          //       </div>
          //     </div>
        ))}
      </div>

      {todos.length !== 0 && (
        <Flex>
          <Button
            variant="white"
            color="gray"
            mt="md"
            onClick={toggle}
            fullWidth
          >
            Cancel
          </Button>

          <Button
            mt="md"
            // onClick={handleAddTask}
            fullWidth
            color="cyan"
            //   disabled={todo === "" ? true : false}
          >
            Save
          </Button>
        </Flex>
      )}
    </Modal>
  );
};

export default AddTodoModal;
