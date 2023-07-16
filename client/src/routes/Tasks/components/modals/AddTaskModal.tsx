import { Modal, TextInput, Button, Flex } from "@mantine/core";
import { useState } from "react";
import { ITask } from "../../../../interfaces/task.interface";
import { useAddTaskMutation } from "../../../../features/api/task/taskApiSlice";
import { JoinRoom } from "../../../../utils/socketConnect";

import { useAppSelector } from "../../../../app/hooks";
import ToastNotify from "../../../../components/ToastNotify";
interface ModalProps {
  add: boolean;
  toggle: () => void;
}

const AddTaskModal = ({ add, toggle }: ModalProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const [addTask, { isLoading, isSuccess }] = useAddTaskMutation();
  const [toAddTask, setToAddTask] = useState<ITask>({
    taskname: "",
    ticketno: "",
    deliverable: "",
  });

  const handleAddTask = async () => {
    JoinRoom(user?.course!, user?.role!);
    try {
      const res: any = await addTask(toAddTask);
      if (res.error) {
        ToastNotify("Task already exist", "error");
      } else {
        ToastNotify("New task added", "success");
      }
    } catch (error) {
      ToastNotify("An error occurred while creating the task", "error");
    }
    setToAddTask({
      taskname: "",
      ticketno: "",
      deliverable: "",
    });
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
