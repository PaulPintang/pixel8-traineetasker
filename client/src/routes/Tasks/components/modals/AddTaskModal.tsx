import {
  Modal,
  TextInput,
  Button,
  Group,
  Flex,
  Card,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { ITask } from "../../../../interfaces/task.interface";
import { IconLink, IconPlus } from "@tabler/icons-react";
import { useAddTaskMutation } from "../../../../features/api/task/taskApiSlice";
import { socket } from "../../../../features/api/task/taskApiSlice";

import { useEffect } from "react";
interface ModalProps {
  add: boolean;
  toggle: () => void;
}

const AddTaskModal = ({ add, toggle }: ModalProps) => {
  const [addTask, { isLoading, isSuccess }] = useAddTaskMutation();
  const [toAddTask, setToAddTask] = useState<ITask>({
    taskname: "",
    ticketno: "",
    deliverable: "",
  });

  const handleAddTask = async () => {
    await addTask(toAddTask);
    setToAddTask({
      taskname: "",
      ticketno: "",
      deliverable: "",
    });
    socket.emit("add", toAddTask);
    toggle();
  };

  return (
    <Modal size="sm" opened={add} onClose={toggle} title="Add new task">
      <div className="py-2 space-y-3">
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            Task name
          </p>
          <TextInput
            autoComplete="off"
            placeholder="Task name"
            name="taskname"
            //   value={newTask.taskname}
            onChange={(e) =>
              setToAddTask({ ...toAddTask, taskname: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            Ticket No.
          </p>
          <TextInput
            autoComplete="off"
            placeholder="Ticket number"
            name="ticketno"
            //   value={newTask.ticketno}
            onChange={(e) =>
              setToAddTask({ ...toAddTask, ticketno: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            Deliverable Link
          </p>
          <TextInput
            autoComplete="off"
            placeholder="Task link"
            name="deliverable"
            //   value={newTask.deliverable}
            onChange={(e) =>
              setToAddTask({ ...toAddTask, deliverable: e.target.value })
            }
          />
        </div>
      </div>

      <Flex>
        <Button variant="white" color="gray" mt="md" onClick={toggle} fullWidth>
          Cancel
        </Button>

        <Button
          mt="md"
          onClick={handleAddTask}
          fullWidth
          disabled={Object.values(toAddTask!).includes("") ? true : false}
          loading={isLoading}
        >
          Add task
        </Button>
      </Flex>
    </Modal>
  );
};

export default AddTaskModal;
