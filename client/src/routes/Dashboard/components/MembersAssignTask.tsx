import {
  Card,
  Image,
  Text,
  Button,
  Flex,
  Group,
  ScrollArea,
} from "@mantine/core";
import empty from "../../../assets/emptytodo.png";
import avatar from "../../../assets/avatar.png";
import { IconInfoCircle, IconUser } from "@tabler/icons-react";
import { members } from "../../../data/members";

const MembersAssignTask = () => {
  return (
    <>
      <Card className="h-[290px] rounded-md shadow-md ">
        <ScrollArea className="h-[84%]" scrollbarSize={8}>
          <div className="text-[13px] space-y-2">
            {members.map((member) => (
              <>
                <Flex justify="space-between">
                  <Group spacing={10}>
                    <Image src={avatar} width={35} />
                    <div className="-space-y-[2px]">
                      <Text className="font-semibold" color="dark">
                        {member.name}
                      </Text>
                      <Group spacing={5}>
                        <div className="bg-green-300 p-1"></div>
                        <Text fw="bold" fz={12}>
                          {member.completedTask}{" "}
                          <span className="text-gray-500 font-normal">
                            tasks
                          </span>
                        </Text>
                      </Group>
                    </div>
                  </Group>
                  <Button
                    leftIcon={<IconUser size={16} />}
                    variant="white"
                    color="cyan"
                    size="xs"
                  >
                    Assign
                  </Button>
                </Flex>
              </>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </>
  );
};

export default MembersAssignTask;
