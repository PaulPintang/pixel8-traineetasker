import { Text, Avatar, Button, ActionIcon } from "@mantine/core";
import avatar from "../../../assets/avatar.png";
import { IconEdit } from "@tabler/icons-react";

const accounts = [
  {
    name: "Juan Dela Cruz",
    email: "juandelacruz@gmail.com",
    role: "developer",
    completed: 13,
  },
  {
    name: "Mikasa Ackerman",
    email: "mikasaackerman@gmail.com",
    role: "designer",
    completed: 23,
  },
  {
    name: "Eren Yeager",
    email: "erenyeager@gmail.com",
    role: "analyst",
    completed: 12,
  },
];

const AccountsTable = () => {
  const rows = accounts.map((account) => (
    <tr>
      <td className="hidden md:table-cell lg:table-cell pl-3 pt-4">
        <Text c="dark">{account.name}</Text>
        <Text c="dimmed">{account.email}</Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell">
        <Text className="uppercase font-semibold text-gray-500">
          {account.role}
        </Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell">
        <Text>
          <Avatar.Group spacing="sm">
            <Avatar src={avatar} radius="xl" size={27} />
            <Avatar src={avatar} radius="xl" size={27} />
            <Avatar src={avatar} radius="xl" size={27} />
            <Avatar radius="xl" size={27}>
              +13
            </Avatar>
          </Avatar.Group>
        </Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell">
        <Text>
          <Avatar.Group spacing="sm">
            <Avatar src={avatar} radius="xl" size={27} />
            <Avatar src={avatar} radius="xl" size={27} />
            <Avatar src={avatar} radius="xl" size={27} />
            <Avatar radius="xl" size={27}>
              +5
            </Avatar>
          </Avatar.Group>
        </Text>
      </td>

      <td className="hidden md:table-cell lg:table-cell">
        <Text className="font-semibold text-gray-500">
          {account.completed} tasks
        </Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell">
        {/* <Button size="xs" color="cyan">
          Edit account
        </Button> */}
        <ActionIcon color="cyan">
          <IconEdit size={20} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <table className="border-collapse border-none w-full">
      <thead>
        <tr>
          <th
            scope="col"
            className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[12px] font-[600] text-gray-400 border-transparent tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
          >
            <Text>Name</Text>
          </th>
          <th
            scope="col"
            className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[12px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
          >
            <Text>Role</Text>
          </th>
          <th
            scope="col"
            className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[12px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
          >
            <Text>Total Trainee's</Text>
          </th>
          <th
            scope="col"
            className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[12px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
          >
            <Text>Current Trainee's</Text>
          </th>

          <th
            scope="col"
            className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[12px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
          >
            <Text>Completed Task</Text>
          </th>
          <th
            scope="col"
            className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[12px] font-[600] text-gray-400 border-transparent tracking-wider  bg-gray-100 shadow-sm rounded-tr-md"
          >
            <Text>Action</Text>
          </th>
        </tr>
      </thead>
      <tbody className="text-[12px] text-gray-600">{rows}</tbody>
    </table>
  );
};

export default AccountsTable;
