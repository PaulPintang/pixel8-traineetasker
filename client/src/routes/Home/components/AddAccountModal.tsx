import {
  Modal,
  TextInput,
  Button,
  Group,
  Flex,
  Card,
  Text,
  Select,
} from "@mantine/core";
import { useState } from "react";

interface ModalProps {
  add: boolean;
  toggle: () => void;
}

interface ModalProps {
  add: boolean;
  toggle: () => void;
}

const AddAccountModal = ({ add, toggle }: ModalProps) => {
  const [toAddTask, setToAddTask] = useState({
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

  const [data, setData] = useState([
    { value: "developer", label: "Software Development" },
    { value: "analyst", label: "System Analyst" },
    { value: "desginer", label: "UI/UX Designer" },
  ]);

  return (
    <Modal size="sm" opened={add} onClose={toggle} title="Add new account">
      <div className="py-2 space-y-3">
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            Name
          </p>
          <TextInput
            autoComplete="off"
            placeholder="Name"
            name="taskname"
            //   value={newTask.taskname}
            onChange={(e) =>
              setToAddTask({ ...toAddTask, taskname: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            Email
          </p>
          <TextInput
            autoComplete="off"
            placeholder="Email"
            name="ticketno"
            //   value={newTask.ticketno}
            onChange={(e) =>
              setToAddTask({ ...toAddTask, ticketno: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            Select Course
          </p>
          <Select
            data={data}
            searchable
            creatable
            placeholder="Pick one"
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setData((current) => [...current, item]);
              return item;
            }}
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
        >
          Add account
        </Button>
      </Flex>
    </Modal>
  );
};

export default AddAccountModal;
