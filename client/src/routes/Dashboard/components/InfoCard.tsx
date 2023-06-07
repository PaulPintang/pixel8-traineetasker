import React from "react";
import { Box, Card, Flex, Text, Group } from "@mantine/core";

const InfoCard = () => {
  return (
    <Card className="h- rounded-md shadow-md space-y-[11px]">
      <Box component="div">
        <Text fz={12} className="text-gray-800 font-semibold uppercase">
          Sofware Development
        </Text>
        <Box component="div" p={5} pl={10}>
          <Group>
            <Text fz={12} className="text-gray-500 font-semibold">
              OJT Required hours:
            </Text>
            <Text fz={12} c="dimmed">
              468 hours
            </Text>
          </Group>
          <Group>
            <Text fz={12} className="text-gray-500 font-semibold">
              Started:
            </Text>
            <Text fz={12} c="dimmed">
              June 07, 2023
            </Text>
          </Group>
        </Box>
      </Box>

      <Box component="div">
        <Text fz={12} className="text-gray-800 font-semibold uppercase">
          Daily Summary
        </Text>
        <Box component="div" p={5} pl={10}>
          <Group>
            <Text fz={12} className="text-gray-500 font-semibold">
              NO. of tasks today:
            </Text>
            <Text fz={12} c="dimmed">
              01
            </Text>
          </Group>
          <Group>
            <Text fz={12} className="text-gray-500 font-semibold">
              Total hours in timesheet:
            </Text>
            <Text fz={12} c="dimmed">
              8 hours
            </Text>
          </Group>
        </Box>
      </Box>

      <Flex align="center" gap={10}>
        <Text fz={12} className="text-gray-800 font-semibold">
          Today:
        </Text>
        <Text fz={12} c="dimmed">
          Wednesday, June 07 2023
        </Text>
      </Flex>
    </Card>
  );
};

export default InfoCard;
