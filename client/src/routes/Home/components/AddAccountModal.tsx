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
import {
  useAddAccountMutation,
  useGetAllAccountQuery,
} from "../../../features/api/account/accountApiSlice";

interface ModalProps {
  add: boolean;
  toggle: () => void;
}

interface ModalProps {
  add: boolean;
  toggle: () => void;
}

const AddAccountModal = ({ add, toggle }: ModalProps) => {
  const [addNewAccount, { isLoading }] = useAddAccountMutation();
  // const fetchAccount = useGetAllAccountQuery();

  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    course: "",
  });

  const handleAddAccount = async () => {
    await addNewAccount(newAccount);
    setNewAccount({
      name: "",
      email: "",
      course: "",
    });
    toggle();
  };

  const course = [
    { value: "developer", label: "Software Development" },
    { value: "analyst", label: "System Analyst" },
    { value: "designer", label: "UI/UX Designer" },
  ];

  return (
    <Modal
      size="sm"
      opened={add}
      onClose={() => {
        toggle();
        setNewAccount({
          name: "",
          email: "",
          course: "",
        });
      }}
      title="Add new account"
    >
      <div className="py-2 space-y-3">
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            Name
          </p>
          <TextInput
            autoComplete="off"
            placeholder="Name"
            name="name"
            //   value={newTask.name}
            onChange={(e) =>
              setNewAccount({ ...newAccount, name: e.target.value })
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
            name="email"
            //   value={newTask.email}
            onChange={(e) =>
              setNewAccount({ ...newAccount, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-gray-400 uppercase font-semibold">
            Select Course
          </p>
          <Select
            data={course}
            searchable
            creatable
            placeholder="Pick one"
            onChange={(value) =>
              setNewAccount({ ...newAccount, course: value! })
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
          onClick={handleAddAccount}
          fullWidth
          disabled={Object.values(newAccount!).includes("") ? true : false}
          loading={isLoading}
        >
          Add account
        </Button>
      </Flex>
    </Modal>
  );
};

export default AddAccountModal;
