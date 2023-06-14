import { lazy, useState } from "react";
import { Flex, Grid, Text, Button } from "@mantine/core";
import { ManageTaskLabels } from "../../components/ColorLabels";
const NewTask = lazy(() => import("./components/NewTask"));
const InProgress = lazy(() => import("./components/InProgress"));
const ForQa = lazy(() => import("./components/ForQa"));
const Completed = lazy(() => import("./components/Completed"));
// import NewTask from "./components/NewTask";
// import InProgress from "./components/InProgress";
// import ForQa from "./components/ForQa";
// import Completed from "./components/Completed";
import { IconBug, IconUrgent } from "@tabler/icons-react";
import TaskUrgent from "./components/TaskUrgent";
const TaskTable = lazy(() => import("./components/TaskTable"));
// import TaskTable from "./components/TaskTable";
import AddTaskModal from "./components/modals/AddTaskModal";
import { useDisclosure } from "@mantine/hooks";
import ViewTaskModal from "./components/modals/ViewTaskModal";
import UpdateTaskModal from "./components/modals/UpdateTaskModal";
import { useAppSelector } from "../../app/hooks";
import { useGetAllTasksQuery } from "../../features/api/task/taskApiSlice";
import { ITrainee } from "../../interfaces/user.interface";
import { useLocation } from "react-router-dom";

interface Props {
  trainee: ITrainee;
}

const Tasks = ({ trainee }: Props) => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const [add, toggleAdd] = useDisclosure(false);
  const [update, toggleUpdate] = useDisclosure(false);
  const [view, toggleView] = useDisclosure(false);
  const [viewId, setViewId] = useState<string | null>(null);
  const { data: tasks } = useGetAllTasksQuery();
  return (
    <>
      <Flex justify="space-between">
        <ManageTaskLabels />
        {user?.role === "trainee" ? (
          <TaskUrgent
            tasks={tasks!}
            setViewId={setViewId}
            toggle={toggleView.toggle}
          />
        ) : user?.role === "supervisor" && !pathname.includes("profile") ? (
          <Button color="cyan" size="xs" onClick={toggleAdd.toggle}>
            Add task
          </Button>
        ) : (
          <Button color="cyan" size="xs" onClick={toggleAdd.toggle}>
            Assign task
          </Button>
        )}
      </Flex>

      {user?.role === "trainee" ? (
        <Grid className="bg-white" mt={15}>
          <Grid.Col span={3} className="space-y-2">
            <Text className="uppercase text-xs font-semibold text-gray-500">
              New Task
            </Text>
            <NewTask setViewId={setViewId} toggle={toggleView.toggle} />
          </Grid.Col>
          <Grid.Col span={3} className="space-y-2">
            <Text className="uppercase text-xs font-semibold text-gray-500">
              In-Progress
            </Text>
            <InProgress setViewId={setViewId} toggle={toggleView.toggle} />
          </Grid.Col>
          <Grid.Col span={3} className="space-y-2">
            <Text className="uppercase text-xs font-semibold text-gray-500">
              For Qa
            </Text>
            <ForQa setViewId={setViewId} toggle={toggleView.toggle} />
          </Grid.Col>
          <Grid.Col span={3} className="space-y-2">
            <Text className="uppercase text-xs font-semibold text-gray-500">
              Completed
            </Text>
            <Completed setViewId={setViewId} toggle={toggleView.toggle} />
          </Grid.Col>
        </Grid>
      ) : (
        <TaskTable
          trainee={trainee}
          setViewId={setViewId}
          view={toggleView.toggle}
          update={toggleUpdate.toggle}
        />
      )}

      {/* Modals */}
      <AddTaskModal add={add} toggle={toggleAdd.toggle} />
      <UpdateTaskModal update={update} toggle={toggleUpdate.toggle} />
      <ViewTaskModal
        tasks={tasks}
        viewId={viewId}
        view={view}
        toggle={toggleView.toggle}
      />
    </>
  );
};

export default Tasks;
