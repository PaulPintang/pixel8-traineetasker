import { Flex, Grid, Text } from "@mantine/core";
import { ManageTaskLabels } from "../../components/ColorLabels";
import NewTask from "./components/NewTask";
import InProgress from "./components/InProgress";
import ForQa from "./components/ForQa";
import Completed from "./components/Completed";
import { IconBug, IconUrgent } from "@tabler/icons-react";
import TaskUrgent from "./components/TaskUrgent";

const Tasks = () => {
  return (
    <>
      <Flex justify="space-between">
        <ManageTaskLabels />
        <TaskUrgent />
      </Flex>
      <Grid className="bg-white" mt={15}>
        <Grid.Col span={3} className="space-y-2">
          <Text className="uppercase text-xs font-semibold text-gray-500">
            New Task
          </Text>
          <NewTask />
        </Grid.Col>
        <Grid.Col span={3} className="space-y-2">
          <Text className="uppercase text-xs font-semibold text-gray-500">
            In-Progress
          </Text>
          <InProgress />
        </Grid.Col>
        <Grid.Col span={3} className="space-y-2">
          <Text className="uppercase text-xs font-semibold text-gray-500">
            For Qa
          </Text>
          <ForQa />
        </Grid.Col>
        <Grid.Col span={3} className="space-y-2">
          <Text className="uppercase text-xs font-semibold text-gray-500">
            Completed
          </Text>
          <Completed />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Tasks;
