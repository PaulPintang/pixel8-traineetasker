import {
  Card,
  Center,
  Image,
  Text,
  Button,
  Box,
  Flex,
  Group,
  Divider,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import empty from "../../../assets/emptytodo.png";
import avatar from "../../../assets/avatar.png";
import { members } from "./MembersTableCards";
import { IconInfoCircle } from "@tabler/icons-react";

const MembersAssignTask = () => {
  return (
    <Card className="h-[290px] rounded-md shadow-md ">
      <Flex justify="space-between" align="center">
        <Text c="dark" fw="bold" className="uppercase" fz="sm" pb={8}>
          Assign task
        </Text>
        <Tooltip
          label={<Text fz={12}>List of members with no task!</Text>}
          color="cyan"
        >
          <IconInfoCircle size={18} className="text-gray-700" />
        </Tooltip>
      </Flex>
      <ScrollArea className="h-[84%]" scrollbarSize={8}>
        <div className="text-[13px] space-y-2">
          {members.map((member) => (
            <>
              <Flex justify="space-between">
                <Group spacing={10}>
                  <Image src={avatar} width={35} />
                  <div className="-space-y-[2px]">
                    <Text className="font-semibold">{member.name}</Text>
                    <Group spacing={5}>
                      <div className="bg-green-300 p-1"></div>
                      <Text fw="bold" fz={12}>
                        {member.completedTask}{" "}
                        <span className="text-gray-500 font-normal">tasks</span>
                      </Text>
                    </Group>
                  </div>
                </Group>
                <Button size="xs" variant="light" color="cyan">
                  Assign a task
                </Button>
              </Flex>
            </>
          ))}
        </div>
      </ScrollArea>
      <Flex pt={4}>
        <Group spacing={3}>
          <Text fz="xs" className="uppercase font-semibold text-gray-700">
            Total:
          </Text>
          <Text fz="xs">
            {members.length} member{members.length >= 2 && "s"}
          </Text>
        </Group>
      </Flex>
    </Card>
  );
};

export default MembersAssignTask;
