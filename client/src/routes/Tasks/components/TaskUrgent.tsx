import {
  Text,
  Menu,
  Tabs,
  Button,
  Group,
  ScrollArea,
  Divider,
  Flex,
} from "@mantine/core";
import {
  IconChecks,
  IconCircleCheckFilled,
  IconExclamationCircle,
  IconUrgent,
} from "@tabler/icons-react";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ITask } from "../../../interfaces/task.interface";
interface Props {
  tasks: ITask[];
  setViewId: Dispatch<SetStateAction<string | null>>;
  toggle: () => void;
}

const TaskUrgent = ({ tasks, setViewId, toggle }: Props) => {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <div className="bg-gray-100  px-2 rounded-full  flex items-center gap-1 py-1 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 transition-all">
          <Text className="text-white py-1 px-2 text-xs rounded-full bg-green-400">
            {tasks.filter((task) => task.status === "completed").length}
          </Text>
          <Text className="text-white py-1 px-2 text-xs rounded-full bg-red-400">
            {tasks.filter((task) => task.status === "failed").length}
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
              icon={<IconChecks className="text-green-500" size={14} />}
              value="first"
            >
              Completed
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
                .filter((task) => task.status === "completed")
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
                      <IconCircleCheckFilled
                        className="text-green-300 mt-[2px]"
                        size={18}
                      />
                      <div className="text-xs flex flex-col gap-[1px]">
                        <Text className="text-gray-700">
                          Your ticket no. <b>{task.ticketno}</b> is completed!
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
                          December 12, 2022 at 09:05 AM
                        </Text>
                      </div>
                    </Flex>
                  </Menu.Item>
                ))}
            </ScrollArea.Autosize>
          </Tabs.Panel>
          <Tabs.Panel value="second" className="space-y-2 p-2">
            <ScrollArea.Autosize mah={258} scrollbarSize={7}>
              {tasks
                .filter((task) => task.status === "failed")
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
                          December 12, 2022 at 09:05 AM
                        </Text>
                      </div>
                    </Flex>
                  </Menu.Item>
                ))}
            </ScrollArea.Autosize>
          </Tabs.Panel>
        </Tabs>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TaskUrgent;
