import { Suspense, lazy, useState } from "react";
import {
  Grid,
  Text,
  Group,
  Flex,
  Image,
  Button,
  Divider,
  Tabs,
} from "@mantine/core";
import TaskCards from "../Dashboard/components/TaskCards";
import { TasksLabels } from "../../components/ColorLabels";
import InfoCard from "../Dashboard/components/InfoCard";
import avatar from "../../assets/avatar.png";
const Tasks = lazy(() => import("../Tasks/Tasks"));
// import Tasks from "../Tasks/Tasks";
import { useParams } from "react-router-dom";
import RemoveTraineeModal from "./RemoveTraineeModal";
import { useDisclosure } from "@mantine/hooks";
import { members } from "../../data/members";
// import TimeSheets from "../TimeSheets/TimeSheets";
const TimeSheets = lazy(() => import("../TimeSheets/TimeSheets"));
const DailyTimeRecord = lazy(
  () => import("../DailyTimeRecord/DailyTimeRecord")
);

// import DailyTimeRecord from "../DailyTimeRecord/DailyTimeRecord";
import { IconReport } from "@tabler/icons-react";
import { useAppSelector } from "../../app/hooks";
const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [remove, { toggle }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>("tasks");
  const { id } = useParams();

  const member = members.find((member) => member.id === Number(id));
  return (
    <>
      <Grid>
        <Grid.Col span="content">
          <Flex direction="column" align="center" justify="center" gap="xs">
            <Image src={avatar} width={100} />
            <Flex direction="column" align="center">
              <Text c="dark" fw="bold" fz="sm">
                {member?.name}
              </Text>
              <Text c="dimmed" fz="xs">
                Bicol University Polangui Campus
              </Text>
              <Text c="dimmed" fz="xs">
                paulpintang@gmail.com
              </Text>

              <div className="pt-1">
                <Button
                  onClick={toggle}
                  size="xs"
                  variant="light"
                  color="red"
                  pt-
                  fullWidth
                >
                  Remove Trainee
                </Button>
              </div>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span="auto" className="space-y-1">
          <TasksLabels />
          <TaskCards />
        </Grid.Col>
        <Grid.Col span="content">
          <InfoCard />
        </Grid.Col>
      </Grid>

      <Tabs value={activeTab} onTabChange={setActiveTab} color="cyan" my={20}>
        <Tabs.List>
          <Tabs.Tab value="tasks" p={0}>
            <Button
              size="xs"
              radius={0}
              variant="white"
              color={activeTab === "tasks" ? "dark" : "gray"}
            >
              <Text c={activeTab === "tasks" ? "dark" : "gray"}>Tasks</Text>
            </Button>
          </Tabs.Tab>
          <Tabs.Tab value="timesheet" p={0}>
            <Button
              size="xs"
              radius={0}
              variant="white"
              color={activeTab === "tasks" ? "dark" : "gray"}
            >
              <Text c={activeTab === "timesheet" ? "dark" : "gray"}>
                Timesheet
              </Text>
            </Button>
          </Tabs.Tab>
          <Tabs.Tab value="dtr" p={0}>
            <Button
              size="xs"
              radius={0}
              variant="white"
              color={activeTab === "tasks" ? "dark" : "gray"}
            >
              <Text c={activeTab === "dtr" ? "dark" : "gray"}>DTR</Text>
            </Button>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tasks" pt="xs">
          <Suspense fallback="loading tasks">
            <Tasks />
          </Suspense>
        </Tabs.Panel>
        <Tabs.Panel value="timesheet" pt="xs">
          <Suspense fallback="loading sheets">
            {activeTab === "timesheet" && <TimeSheets />}
          </Suspense>
        </Tabs.Panel>
        <Tabs.Panel value="dtr" pt="xs">
          <Suspense fallback="loading records">
            {activeTab === "dtr" && <DailyTimeRecord />}
          </Suspense>
        </Tabs.Panel>
      </Tabs>

      <RemoveTraineeModal remove={remove} toggle={toggle} />
    </>
  );
};

export default Profile;
