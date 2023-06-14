import React from "react";
import {
  Box,
  Card,
  Flex,
  Text,
  Group,
  Avatar,
  Tooltip,
  Image,
} from "@mantine/core";
import avatar from "../../../assets/avatar.png";
import { useAppSelector } from "../../../app/hooks";
import {
  useGetAllTraineeQuery,
  useGetTraineeQuery,
} from "../../../features/api/trainee/traineeApiSlice";
import { ITrainee } from "../../../interfaces/user.interface";
import { useLocation } from "react-router-dom";

const InfoCard = () => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const { data: trainee } = useGetTraineeQuery(user?._id!);
  const { data: trainees } = useGetAllTraineeQuery(user?.course!);

  return (
    <Card className="h- rounded-md shadow-md space-y-[6px]">
      <Box component="div">
        <Text fz={12} className="text-gray-800 font-semibold uppercase">
          {user?.role === "trainee" ? trainee?.name : user?.course}
        </Text>
        {user?.role === "trainee" || pathname.includes("profile") ? (
          <>
            <Box component="div" p={8} pl={10}>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  OJT Required hours:
                </Text>
                <Text fz={12} c="dimmed">
                  {trainee?.hours?.ojtHours} hours
                </Text>
              </Group>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  Started:
                </Text>
                <Text fz={12} c="dimmed">
                  June 07, 2023
                </Text>
              </Group>
            </Box>
            <Box component="div">
              <Text fz={12} className="text-gray-800 font-semibold uppercase">
                Daily Summary
              </Text>
              <Box component="div" p={5} pl={10}>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    No. of tasks today:
                  </Text>
                  <Text fz={12} c="dimmed">
                    01
                  </Text>
                </Group>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    Total hours in timesheet:
                  </Text>
                  <Text fz={12} c="dimmed">
                    8 hours
                  </Text>
                </Group>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box component="div" p={8} pl={10}>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  Total members:
                </Text>
                <Text fz={12} c="dimmed">
                  {trainees?.length} trainee's
                </Text>
              </Group>
              <Group spacing={10}>
                <Text fz={12} className="text-gray-500 font-semibold">
                  Completed task:
                </Text>
                <Text fz={12} c="dimmed">
                  20 tasks
                </Text>
              </Group>
            </Box>
            <Box component="div">
              <Text fz={12} className="text-gray-800 font-semibold uppercase">
                Today Summary
              </Text>
              <Box component="div" p={5} pl={10}>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    No. of completed task:
                  </Text>
                  <Text fz={12} c="dimmed">
                    01 task
                  </Text>
                </Group>
                <Group spacing={10}>
                  <Text fz={12} className="text-gray-500 font-semibold">
                    No. of in progress task:
                  </Text>
                  <Text fz={12} c="dimmed">
                    12 tasks
                  </Text>
                </Group>
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Flex align="center" gap={10}>
        <Group>
          <Text c="dark" size="xs" className="font-semibold">
            Members:
          </Text>
          <Tooltip.Group openDelay={300} closeDelay={100}>
            <Avatar.Group spacing="sm">
              {/* <Tooltip label="Salazar Troop" withArrow>
                <Avatar src={avatar} radius="xl" size={27} />
              </Tooltip>
              <Tooltip label="Jusswaa" withArrow>
                <Avatar src={avatar} radius="xl" size={27} />
              </Tooltip>
              <Tooltip label="Roberto" withArrow>
                <Avatar src={avatar} radius="xl" size={27} />
              </Tooltip>
              <Tooltip label="Mick" withArrow>
                <Avatar src={avatar} radius="xl" size={27} />
              </Tooltip>
              <Tooltip label="Troop" withArrow>
                <Avatar src={avatar} radius="xl" size={27} />
              </Tooltip>
              <Tooltip
                withArrow
                label={
                  <>
                    <div>John Outcast</div>
                    <div>Levi Capitan</div>
                  </>
                }
              >
                <Avatar radius="xl" size={27}>
                  +2
                </Avatar> 
              </Tooltip> */}
              {trainees?.map((user) => (
                <Tooltip label={user.name} withArrow>
                  <Avatar src={user.picture} radius="xl" size={27} />
                </Tooltip>
              ))}
            </Avatar.Group>
          </Tooltip.Group>
        </Group>
      </Flex>
    </Card>
  );
};

export default InfoCard;
