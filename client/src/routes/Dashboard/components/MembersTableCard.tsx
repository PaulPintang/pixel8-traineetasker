import {
  Card,
  Text,
  Flex,
  Group,
  Pagination,
  ActionIcon,
  Button,
  Image,
  Menu,
  Checkbox,
  Stack,
  Select,
} from "@mantine/core";
import { IconDots, IconUser } from "@tabler/icons-react";
import { chunk } from "lodash";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IconInfoCircle } from "@tabler/icons-react";
import AssignTaskModal from "./AssignTaskModal";
import { useDisclosure } from "@mantine/hooks";
import { useGetAllTraineeQuery } from "../../../features/api/trainee/traineeApiSlice";
import { useAppSelector } from "../../../app/hooks";
import { useGetAllTasksQuery } from "../../../features/api/task/taskApiSlice";
import GettingData from "../../../components/GettingData";
import EmptyState from "../../../components/EmptyState";

const traineesTableCard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: trainees, isLoading } = useGetAllTraineeQuery(user?.course!);
  const { data: tasks } = useGetAllTasksQuery();
  const [showNoTask, setShowNoTask] = useState(false);
  const [showWithQa, setShowWithQa] = useState(false);

  const [assignTo, setAssignTo] = useState("");
  const [assign, { toggle }] = useDisclosure();
  const [page, setPage] = useState(1);

  const data = trainees?.filter((trainee) =>
    showNoTask
      ? !tasks?.some(
          (task) => task.assign === trainee.name && task.status === "inprogress"
        )
      : showWithQa
      ? tasks?.some(
          (task) => task.assign === trainee.name && task.status === "forqa"
        )
      : showNoTask && showWithQa
      ? tasks?.some(
          (task) =>
            (task.assign === trainee.name && task.status === "forqa") ||
            task.status === "inprogress"
        )
      : trainee
  );

  const items = chunk(data, 4);

  const rows = items[page - 1]?.map((trainee) => {
    return (
      <tr>
        <td className=" md:table-cell lg:table-cell pl-3 pt-3">
          <Group spacing={10}>
            <Image
              src={trainee.picture}
              width={35}
              radius="xl"
              imageProps={{ referrerPolicy: "no-referrer" }}
              className="hidden md:flex lg:flex"
            />
            <div className="-space-y-[2px]">
              <Text className="font-semibold">{trainee.name}</Text>
              <Text c="dimmed">{trainee.email}</Text>
            </div>
          </Group>
        </td>
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
            {
              tasks?.filter(
                (task) =>
                  task.assign === trainee.name && task.status === "completed"
              ).length
            }{" "}
            <span className="font-normal">tasks</span>
          </Text>
        </td>
        <td className=" md:table-cell lg:table-cell pt-2">
          {user?.role !== "Task manager" ? (
            <Link to={`../profile/${trainee._id}`}>
              <Button variant="white" color="cyan" size="xs">
                View
              </Button>
            </Link>
          ) : (
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
                      onClick={() => {
                        setAssignTo(trainee.name!);
                        toggle();
                      }}
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
          )}
        </td>
      </tr>
    );
  });

  return (
    <>
      <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-100px)] w-full">
        {/* <Card className="bg-opacity-60 rounded-md shadow-md h-[calc(100vh-365px)] w-full"> */}
        <div className="h-[97%]">
          {/* <div className="h-[93%]"> */}
          <table className="border-collapse border-none w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="md:px-3 lg:px-3 pl-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tl-md"
                >
                  <Text>Intern</Text>
                </th>
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
                  className="hidden  md:table-cell lg:table-cell py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider bg-gray-100 shadow-sm"
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
                  className="md:px-3 lg:px-3 py-3 text-left text-[9px] font-[600] text-gray-400   tracking-wider  bg-gray-100 shadow-sm rounded-tr-md"
                >
                  <Text>Action</Text>
                </th>
              </tr>
            </thead>
            {isLoading ? (
              <>
                <GettingData />
              </>
            ) : data?.length === 0 ? (
              <>
                <EmptyState
                  text={
                    showNoTask
                      ? "No members with no task!"
                      : showWithQa
                      ? "No members with forQA task"
                      : "No members yet"
                  }
                />
                ;
              </>
            ) : (
              <tbody className="text-xs text-gray-600">{rows}</tbody>
            )}
          </table>
        </div>

        <Flex justify="space-between" className="relative">
          <Group align="center">
            <Group spacing={3}>
              <Text fz="xs" className="uppercase font-semibold text-gray-700">
                Total:
              </Text>
              <Text fz="xs">
                {data?.length} trainee{data?.length! >= 2 && "s"}
              </Text>
            </Group>
            <Checkbox
              checked={showNoTask}
              onChange={(event) => setShowNoTask(event.currentTarget.checked)}
              size="xs"
              color="cyan"
              label="No inprogress task"
            />
            <Checkbox
              checked={showWithQa}
              onChange={(event) => setShowWithQa(event.currentTarget.checked)}
              size="xs"
              color="cyan"
              label="With for-QA task"
            />
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
      <AssignTaskModal assignTo={assignTo} assign={assign} toggle={toggle} />
    </>
  );
};

export default traineesTableCard;
