import React from "react";
import { Group, Flex, Text } from "@mantine/core";

export const TasksLabels = () => {
  return (
    <Group>
      <Flex align="center" gap={8}>
        <div className="bg-teal-300 w-2 h-2 mb-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          All
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-indigo-300 w-2 h-2 mb-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          New
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-violet-400 w-2 h-2 mb-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          in-progress
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-green-300 w-2 h-2 mb-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          completed
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-yellow-300 w-2 h-2 mb-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          for-qa
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-red-300 w-2 h-2 mb-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          failed
        </Text>
      </Flex>
    </Group>
  );
};
