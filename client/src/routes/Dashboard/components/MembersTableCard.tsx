import {
  Card,
  Table,
  Text,
  Flex,
  Group,
  Pagination,
  Tooltip,
  ActionIcon,
  Select,
  Button,
  Image,
  Menu,
  Checkbox,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconExternalLink,
  IconId,
  IconUser,
} from "@tabler/icons-react";
import { chunk } from "lodash";
import { useState, useEffect, ReactNode } from "react";
import avatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";
import { IconInfoCircle } from "@tabler/icons-react";
import AssignTaskModal from "./AssignTaskModal";
import { useDisclosure } from "@mantine/hooks";
// import { trainees } from "../../../data/trainees";
import { useGetAllTraineeQuery } from "../../../features/api/trainee/traineeApiSlice";
import { useAppSelector } from "../../../app/hooks";

const traineesTableCard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);

  const [assign, { toggle }] = useDisclosure();
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState<string | null>("");

  //   const data = trainees?.filter((trainee) =>
  //     filterBy ? trainee.status === filterBy : trainee
  //   );

  const items = chunk(trainees, 4);

  const rows = items[page - 1]?.map((trainee) => (
    <tr>
      <td className="hidden md:table-cell lg:table-cell pl-3 pt-3">
        <Group spacing={10}>
          <Image
            src={trainee.picture}
            width={35}
            radius="xl"
            imageProps={{ referrerPolicy: "no-referrer" }}
          />
          <div className="-space-y-[2px]">
            <Text className="font-semibold">{trainee.name}</Text>
            <Text c="dimmed">{trainee.email}</Text>
          </div>
        </Group>
      </td>
      {/* <td className="hidden md:table-cell lg:table-cell pl-3 ">
        <Text className="font-semibold">{trainee.school}</Text>
      </td> */}
      <td className="hidden md:table-cell lg:table-cell pl-3 ">
        <Text className="font-semibold">
          {trainee.hours?.ojtHours} <span className="font-normal">hours</span>
        </Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell pl-3 ">
        <Text className="font-semibold">
          {trainee.hours?.pending} <span className="font-normal">hours</span>
        </Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell pl-3 ">
        <Text className="font-semibold">
          {trainee.hours?.rendered} <span className="font-normal">hours</span>
        </Text>
      </td>
      <td className="hidden md:table-cell lg:table-cell pl-3 ">
        <Text className="font-semibold">
          {trainee.completedTask} <span className="font-normal">tasks</span>
        </Text>
      </td>
      {/* <td className="hidden md:table-cell lg:table-cell pl-3 ">
        <Link to={`../profile/${trainee.id}`}>
          <ActionIcon variant="light" color="cyan">
            <IconId size={19} />
          </ActionIcon>
        </Link>
      </td> */}
      <td className="hidden md:table-cell lg:table-cell pl-3 pt-2">
        <Menu
          shadow="md"
          transitionProps={{ transition: "rotate-right", duration: 150 }}
          withArrow
        >
          <Menu.Target>
            <ActionIcon variant="white" color="cyan">
              <IconDots size={19} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Manage intern</Menu.Label>
            <Menu.Item p={0} className="bg-white hover:bg-white">
              <Flex direction="column" align="start">
                <Link to={`../profile/${trainee._id}`}>
                  <Button
                    leftIcon={<IconInfoCircle size={16} />}
                    variant="white"
                    color="dark"
                    size="xs"
                  >
                    View
                  </Button>
                </Link>
                <Button
                  onClick={toggle}
                  leftIcon={<IconUser size={16} />}
                  variant="white"
                  color="cyan"
                  size="xs"
                >
                  Assign
                </Button>
              </Flex>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-370px)] w-full">
        <div className="h-[93%] overflow-hidden">
          <table className="border-collapse border-none w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
                >
                  <Text>Intern</Text>
                </th>
                {/* <th
                  scope="col"
                  className="rounded-tr-md md:rounded-none lg:rounded-none py-3 md:pr-3 lg:pr-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm"
                >
                  <Text>Gender</Text>
                </th> */}
                <th
                  scope="col"
                  className="hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Required hours</Text>
                </th>

                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Pending hours</Text>
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Rendered hours</Text>
                </th>
                <th
                  scope="col"
                  className=" hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                >
                  <Text>Completed task</Text>
                </th>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md"
                >
                  <Text>Action</Text>
                </th>
                {/* <th
                  scope="col"
                  className="rounded-tr-md hidden md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
                ></th> */}
              </tr>
            </thead>
            <tbody className="text-xs text-gray-600">{rows}</tbody>
          </table>
        </div>

        <Flex justify="space-between">
          <Group align="center">
            <Flex>
              <Group spacing={3}>
                <Text fz="xs" className="uppercase font-semibold text-gray-700">
                  Total:
                </Text>
                <Text fz="xs">
                  {trainees?.length} trainee{trainees?.length! >= 2 && "s"}
                </Text>
              </Group>
            </Flex>
            <Checkbox size="xs" color="cyan" label="No current task" />
            <Checkbox size="xs" color="cyan" label="With for-QA task" />
          </Group>
          <Pagination
            total={items.length}
            value={page}
            onChange={setPage}
            size="xs"
            color="cyan"
            withEdges
          />
        </Flex>
      </Card>
      <AssignTaskModal assign={assign} toggle={toggle} />
    </>
  );
};

export default traineesTableCard;
