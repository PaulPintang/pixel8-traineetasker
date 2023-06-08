import {
  Modal,
  Text,
  Group,
  Flex,
  Menu,
  Timeline,
  Tabs,
  Image,
  Breadcrumbs,
  Title,
  Button,
  TextInput,
  ActionIcon,
  Textarea,
  Paper,
} from "@mantine/core";
import avatar from "../../assets/avatar.png";
import { IconMessage, IconSend } from "@tabler/icons-react";
const ViewTaskModal = () => {
  return (
    <Modal
      size="sm"
      opened={true}
      onClose={() => console.log()}
      title={
        <Breadcrumbs className="text-xs text-gray-500">
          <Text>Tasks</Text>
          <Text>Header page sadas</Text>
          <Text c="dark">In progress</Text>
        </Breadcrumbs>
      }
    >
      <Title order={4} c="dark" pb={15}>
        Header page
      </Title>
      <div className="space-y-2">
        <Group align="flex-start">
          <Text className="w-1/4" c="dimmed" fz="sm">
            Assign
          </Text>
          <Group spacing={10}>
            <Image src={avatar} width={20} />
            <Text fz="sm">Paul Justine Pintang</Text>
          </Group>
        </Group>
        <Group align="flex-start">
          <Text className="w-1/4" c="dimmed" fz="sm">
            Ticket No.
          </Text>
          <Text fz="sm">dsada3ewqeqwg</Text>
        </Group>
        <Group align="flex-start">
          <Text className="w-1/4" c="dimmed" fz="sm">
            Status
          </Text>
          <Text fz="sm">In-progress</Text>
        </Group>
      </div>

      <Tabs
        // value={activeTab}
        // onTabChange={setActiveTab}
        pt={10}
        color="cyan"
      >
        <Tabs.List>
          <Tabs.Tab className="w-2/4 text-xs" value="first">
            Comments
          </Tabs.Tab>
          <Tabs.Tab className="w-2/4 text-xs" value="second">
            Timeline
          </Tabs.Tab>
        </Tabs.List>
        <div className="p-3 max-h-[358px] overflow-y-scroll" id="b-scrollbar">
          <Tabs.Panel value="first" className="space-y-2">
            <Group spacing={10}>
              <Image src={avatar} width={20} />
              <Text c="dimmed" fw="bold" fz="xs">
                Your comment
              </Text>
            </Group>
            <Flex gap={5}>
              <Textarea
                className="w-full"
                placeholder="Add your comment"
                autosize
                maxRows={2}
                size="xs"
              />
              <ActionIcon color="cyan" variant="white" size="lg">
                <IconSend size={19} />
              </ActionIcon>
            </Flex>
            <section className="space-y-3">
              <Paper component="div" className="bg-slate-50 space-y-2" p={11}>
                <Text fz="xs" c="dark">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus cumque unde
                </Text>
                <Group position="apart">
                  <Group spacing={10}>
                    <Image src={avatar} width={20} />
                    <Text fz="xs" fw="bold">
                      Juan Dela Cruz
                    </Text>
                  </Group>
                  <Text c="dimmed" fz="xs">
                    2 min ago
                  </Text>
                </Group>
              </Paper>
              <Paper component="div" className="bg-slate-50 space-y-2" p={11}>
                <Text fz="xs" c="dark">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
                <Group position="apart">
                  <Text c="dimmed" fz="xs">
                    8 min ago
                  </Text>
                  <Group spacing={10}>
                    <Image src={avatar} width={20} />
                    <Text fz="xs" fw="bold">
                      You
                    </Text>
                  </Group>
                </Group>
              </Paper>
            </section>
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
    </Modal>
  );
};

export default ViewTaskModal;
