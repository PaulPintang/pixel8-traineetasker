import React from "react";
import { Group, Flex, Text } from "@mantine/core";

export const TasksLabels = () => {
  return (
    <Group>
      <Flex align="center" gap={8}>
        <div className="bg-teal-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          All
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-indigo-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          New
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-violet-400 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          in-progress
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-green-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          completed
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-yellow-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          for-qa
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-red-300 p-1"></div>
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

export const ManageTaskLabels = () => {
  return (
    <Group>
      <Flex align="center" gap={8}>
        <div className="bg-indigo-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          New
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-violet-400 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          in-progress
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-green-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          completed
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-yellow-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          for-qa
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-red-300 p-1"></div>
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

export const TimeSheetsLabels = () => {
  return (
    <Group>
      <Flex align="center" gap={8}>
        <div className="bg-yellow-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          am
        </Text>
      </Flex>

      <Flex align="center" gap={8}>
        <div className="bg-violet-400 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          pm
        </Text>
      </Flex>
      <Flex align="center" gap={8}>
        <div className="bg-green-300 p-1"></div>
        <Text
          fz="sm"
          className="text-gray-400  text-[10px] uppercase font-semibold "
        >
          recorded
        </Text>
      </Flex>
    </Group>
  );
};
