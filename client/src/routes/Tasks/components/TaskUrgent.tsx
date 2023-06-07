import { Text, Menu, Tabs, Button } from "@mantine/core";
import { IconChecks, IconUrgent } from "@tabler/icons-react";
import { useState } from "react";

const TaskUrgent = () => {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <div className="bg-gray-100  px-2 rounded-full  flex items-center gap-1 py-1 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 transition-all">
          <Text className="text-white py-1 px-2 text-xs rounded-full bg-green-400">
            2
          </Text>
          <Text className="text-white py-1 px-2 text-xs rounded-full bg-red-400">
            5
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
          <div className="p-3 max-h-[358px] overflow-y-scroll" id="b-scrollbar">
            <Tabs.Panel value="first" className="space-y-2">
              <div className="flex items-start gap-2">
                {/* <AiFillCheckCircle className="text-green-300 text-sm mt-[2px]" /> */}
                <div className="text-xs flex flex-col gap-[1px]">
                  <Text className="text-gray-700">
                    Your ticket no. <b>63243520324</b> is completed!
                  </Text>
                  <Text className="text-gray-600 text-[11px]">Comment:</Text>
                  <Text className="text-gray-500  text-[11px]">
                    December 12, 2022 at 09:05 AM
                  </Text>
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="second" className="space-y-2">
              <div className="flex items-start gap-2">
                {/* <MdError className="text-red-300 text-sm mt-[2px]" /> */}
                <div className="text-xs flex flex-col gap-[1px]">
                  <Text className="text-gray-700">
                    Your ticket no. <b>63243520324</b> is failed!
                  </Text>
                  <Text className="text-gray-600  text-[11px]">Comment:</Text>
                  <Text className="text-gray-500  text-[11px]">
                    December 12, 2022 at 09:05 AM
                  </Text>
                  <Button size="xs" className="w-2/4" color="teal">
                    Revise
                  </Button>
                </div>
              </div>
            </Tabs.Panel>
          </div>
        </Tabs>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TaskUrgent;
