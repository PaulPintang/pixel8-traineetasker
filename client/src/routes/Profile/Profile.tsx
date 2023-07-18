import { Suspense, lazy, useState, useEffect } from "react";
import { Grid, Text, Image, Button, Flex, Tabs } from "@mantine/core";
import TaskCards from "../Dashboard/components/TaskCards";
import { TasksLabels } from "../../components/ColorLabels";
import InfoCard from "../Dashboard/components/InfoCard";
import { useParams } from "react-router-dom";
import RemoveTraineeModal from "./RemoveTraineeModal";
import { useDisclosure } from "@mantine/hooks";
import Tasks from "../Tasks/Tasks";
const TimeSheets = lazy(() => import("../TimeSheets/TimeSheets"));
const DailyTimeRecord = lazy(
  () => import("../DailyTimeRecord/DailyTimeRecord")
);

import { useAppSelector } from "../../app/hooks";
import { useGetAllTraineeQuery } from "../../features/api/trainee/traineeApiSlice";
import { useDocumentTitle } from "@mantine/hooks";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const { data: trainees, refetch } = useGetAllTraineeQuery(user?.course!);
  const [remove, { toggle }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>("tasks");

  const trainee = trainees?.find((member) => member._id! === id);

  // useEffect(() => {
  //   refetch();
  // }, []);

  useDocumentTitle("Profile");

  interface SuspenseTabsProps {
    tab: string;
  }

  const SuspenseTabs = ({ tab }: SuspenseTabsProps) => {
    return (
      <Button variant="white" color="dark" size="xs" mb={55} loading>
        <Text c="dark" fz="xs" className="tracking-wide">
          loading {tab} . . .
        </Text>
      </Button>
    );
  };

  return (
    <>
      <Grid>
        <Grid.Col sm="auto" lg="content" md="content">
          <Flex direction="column" align="center" justify="center" gap="xs">
            <Image
              src={trainee?.picture}
              width={100}
              radius={100}
              imageProps={{ referrerPolicy: "no-referrer" }}
            />
            <Flex direction="column" align="center">
              <Text c="dark" fw="bold" fz="sm">
                {trainee?.name}
              </Text>
              <Text c="dimmed" fz="xs">
                {trainee?.school}
              </Text>
              <Text c="dimmed" fz="xs">
                {trainee?.email}
              </Text>

              {user?.role === "supervisor" && (
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
              )}
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span="auto" className="space-y-1">
          <TasksLabels />
          <TaskCards profile={trainee!} />
        </Grid.Col>
        <Grid.Col sm="auto" lg="content" md="content">
          <InfoCard trainee={trainee!} />
        </Grid.Col>
      </Grid>

      <Tabs
        value={activeTab}
        onTabChange={setActiveTab}
        color="cyan"
        my={20}
        className="bg-white"
      >
        <Tabs.List>
          <Tabs.Tab value="tasks" py={8} px={15}>
            <Text c={activeTab === "tasks" ? "dark" : "gray"} fz="xs" fw="bold">
              Tasks
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="timesheet" py={8} px={15}>
            <Text
              c={activeTab === "timesheet" ? "dark" : "gray"}
              fz="xs"
              fw="bold"
            >
              Timesheet
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="dtr" py={8} px={15}>
            <Text c={activeTab === "dtr" ? "dark" : "gray"} fz="xs" fw="bold">
              DTR
            </Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tasks" pt="xs" pb="lg">
          <Suspense fallback={<SuspenseTabs tab="tasks" />}>
            <Tasks trainee={trainee!} />
          </Suspense>
        </Tabs.Panel>
        <Tabs.Panel value="timesheet" pt="xs" pb="lg">
          <Suspense fallback={<SuspenseTabs tab="timesheets" />}>
            {activeTab === "timesheet" && <TimeSheets profile={trainee!} />}
          </Suspense>
        </Tabs.Panel>
        <Tabs.Panel value="dtr" pt="xs" pb="lg">
          <Suspense fallback={<SuspenseTabs tab="dtr" />}>
            {activeTab === "dtr" && <DailyTimeRecord profile={trainee!} />}
          </Suspense>
        </Tabs.Panel>
      </Tabs>

      <RemoveTraineeModal remove={remove} toggle={toggle} />
    </>
  );
};

export default Profile;
