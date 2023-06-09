import { Flex, Grid, Text, Button } from "@mantine/core";
import { ManageTaskLabels } from "../../components/ColorLabels";
import NewTask from "./components/NewTask";
import InProgress from "./components/InProgress";
import ForQa from "./components/ForQa";
import Completed from "./components/Completed";
import { IconBug, IconUrgent } from "@tabler/icons-react";
import TaskUrgent from "./components/TaskUrgent";
import TaskTable from "./components/TaskTable";
import { addModal } from "../../features/modals/modalSlice";
import AddTaskModal from "./components/modals/AddTaskModal";
import { useDisclosure } from "@mantine/hooks";
import ViewTaskModal from "./components/modals/ViewTaskModal";
import UpdateTaskModal from "./components/modals/UpdateTaskModal";

const Tasks = () => {
  const [add, toggleAdd] = useDisclosure(false);
  const [update, toggleUpdate] = useDisclosure(false);
  const [view, toggleView] = useDisclosure(false);
  return (
    <>
      <Flex justify="space-between">
        <ManageTaskLabels />
        <Button color="cyan" size="xs" onClick={toggleAdd.toggle}>
          Add task
        </Button>
        {/* <TaskUrgent /> */}
      </Flex>
      <Grid className="bg-white" mt={15}>
        <Grid.Col span={3} className="space-y-2">
          <Text className="uppercase text-xs font-semibold text-gray-500">
            New Task
          </Text>
          <NewTask toggle={toggleView.toggle} />
        </Grid.Col>
        <Grid.Col span={3} className="space-y-2">
          <Text className="uppercase text-xs font-semibold text-gray-500">
            In-Progress
          </Text>
          <InProgress toggle={toggleView.toggle} />
        </Grid.Col>
        <Grid.Col span={3} className="space-y-2">
          <Text className="uppercase text-xs font-semibold text-gray-500">
            For Qa
          </Text>
          <ForQa toggle={toggleView.toggle} />
        </Grid.Col>
        <Grid.Col span={3} className="space-y-2">
          <Text className="uppercase text-xs font-semibold text-gray-500">
            Completed
          </Text>
          <Completed toggle={toggleView.toggle} />
        </Grid.Col>
      </Grid>
      <TaskTable view={toggleView.toggle} update={toggleUpdate.toggle} />

      {/* Modals */}
      <AddTaskModal add={add} toggle={toggleAdd.toggle} />
      <UpdateTaskModal update={update} toggle={toggleUpdate.toggle} />
      <ViewTaskModal view={view} toggle={toggleView.toggle} />
    </>
  );
};

export default Tasks;
