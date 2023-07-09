import { Modal, TextInput, Button, Flex } from "@mantine/core";
import { useState } from "react";
import { ITask } from "../../../../interfaces/task.interface";
import { IconLink, IconPlus } from "@tabler/icons-react";

interface ModalProps {
  update: boolean;
  toggle: () => void;
}

const UpdateTaskModal = ({ update, toggle }: ModalProps) => {
  const [toAddTask, setToAddTask] = useState<ITask>({
    taskname: "",
    ticketno: "",
    deliverable: "",
  });

  const handleAddTask = () => {
    setToAddTask({
      taskname: "",
      ticketno: "",
      deliverable: "",
    });
  };

  return (
    <Modal size="sm" opened={update} onClose={toggle} title="Update task">
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
          color="teal"
          mt="md"
          onClick={handleAddTask}
          fullWidth
          disabled={Object.values(toAddTask!).includes("") ? true : false}
        >
          Update task
        </Button>
      </Flex>
    </Modal>
  );
};

export default UpdateTaskModal;
