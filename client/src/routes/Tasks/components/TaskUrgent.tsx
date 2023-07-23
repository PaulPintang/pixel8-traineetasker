import { Text, Menu, Tabs, Group, ScrollArea, Flex } from "@mantine/core";
import {
  IconClockPause,
  IconExclamationCircle,
  IconPlaystationSquare,
  IconUrgent,
} from "@tabler/icons-react";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ITask } from "../../../interfaces/task.interface";
import { formatDateTime } from "../../../utils/formatDateTime";
interface Props {
  tasks: ITask[];
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const TaskUrgent = ({ tasks, setViewId, toggle }: Props) => {
  const [activeTab, setActiveTab] = useState<string | null>("second");
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <div className="bg-gray-100  px-2 rounded-full  flex items-center gap-1 py-1 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 transition-all">
          <Text className="text-white py-1 px-2 text-xs rounded-full bg-yellow-300">
            {tasks?.filter((task) => task.status === "pending").length}
          </Text>
          <Text className="text-white py-1 px-2 text-xs rounded-full bg-red-400">
            {tasks?.filter((task) => task.status === "failed").length}
          </Text>
          <IconUrgent />
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          className="w-[282px]"
        >
          <Tabs.List>
            <Tabs.Tab
              className="w-2/4 text-xs"
              icon={<IconClockPause className="text-yellow-300" size={14} />}
              value="first"
            >
              Pending
            </Tabs.Tab>
            <Tabs.Tab
              className="w-2/4 text-xs"
              icon={<IconUrgent className="text-red-500" size={14} />}
              value="second"
            >
              Failed
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="first" className="space-y-2 p-2 h-full">
            <ScrollArea.Autosize mah={258} scrollbarSize={7}>
              {tasks
                ?.filter((task) => task.status === "pending")
                .map((task) => (
                  <Menu.Item p={0} className="bg-white hover:bg-white">
                    <Flex
                      gap={5}
                      className="hover:bg-slate-50 hover:opacity-80 transition-all rounded-md p-2 cursor-pointer"
                      onClick={() => {
                        toggle();
                        setViewId(task._id!);
                      }}
                    >
                      <IconPlaystationSquare
                        className="text-yellow-300 mt-[2px]"
                        size={18}
                      />
                      <div className="text-xs flex flex-col gap-[1px]">
                        <Text className="text-gray-700">
                          Your ticket no. <b>{task.ticketno}</b> is pending!
                        </Text>
                        <Group spacing={10}>
                          <Text className="text-gray-600  text-[11px] font-semibold">
                            Task name:
                          </Text>
                          <Text className="text-gray-600  text-[11px]">
                            {task.taskname}
                          </Text>
                        </Group>
                        <Group spacing={10}>
                          <Text className="text-gray-600  text-[11px] font-semibold">
                            Recorded spent:
                          </Text>
                          <Text className="text-gray-600  text-[11px]">
                            {task.spent}
                          </Text>
                        </Group>
                      </div>
                    </Flex>
                  </Menu.Item>
                ))}
            </ScrollArea.Autosize>
            {tasks?.filter((task) => task.status === "pending").length ===
              0 && (
              <Text
                c="dimmed"
                fs="italic"
                fz="xs"
                className="tracking-normal text-center"
              >
                no pending tasks!
              </Text>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="second" className="space-y-2 p-2">
            <ScrollArea.Autosize mah={258} scrollbarSize={7}>
              {tasks
                ?.filter((task) => task.status === "failed")
                .map((task) => {
                  return (
                    <Menu.Item p={0} className="bg-white hover:bg-white">
                      <Flex
                        gap={5}
                        className="hover:bg-slate-50 hover:opacity-80 transition-all rounded-md p-2 cursor-pointer"
                        onClick={() => {
                          toggle();
                          setViewId(task._id!);
                        }}
                      >
                        <IconExclamationCircle
                          className="text-red-300 mt-[2px]"
                          size={18}
                        />
                        <div className="text-xs flex flex-col gap-[1px]">
                          <Text className="text-gray-700">
                            Your ticket no. <b>{task.ticketno}</b> is failed!
                          </Text>
                          <Group spacing={10}>
                            <Text className="text-gray-600  text-[11px] font-semibold">
                              Task name:
                            </Text>
                            <Text className="text-gray-600  text-[11px]">
                              {task.taskname}
                            </Text>
                          </Group>
                          <Text className="text-gray-500  text-[11px]">
                            {
                              task.timeline?.revisions[
                                task.timeline.revisions.length - 1
                              ]
                            }
                          </Text>
                        </div>
                      </Flex>
                    </Menu.Item>
                  );
                })}
            </ScrollArea.Autosize>
            {tasks?.filter((task) => task.status === "failed").length === 0 && (
              <Text
                c="dimmed"
                fs="italic"
                fz="xs"
                className="tracking-normal text-center"
              >
                no failed tasks!
              </Text>
            )}
          </Tabs.Panel>
        </Tabs>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TaskUrgent;
