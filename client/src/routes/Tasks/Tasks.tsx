import { lazy, useState, useEffect } from "react";
import { Flex, Grid, Text, Button, Tabs, Stack } from "@mantine/core";
import { ManageTaskLabels } from "../../components/ColorLabels";
const NewTask = lazy(() => import("./components/NewTask"));
const InProgress = lazy(() => import("./components/InProgress"));
const ForQa = lazy(() => import("./components/ForQa"));
const Completed = lazy(() => import("./components/Completed"));

import TaskUrgent from "./components/TaskUrgent";
const TaskTable = lazy(() => import("./components/TaskTable"));
import { useDisclosure } from "@mantine/hooks";
import { useDocumentTitle } from "@mantine/hooks";
import ViewTaskModal from "./components/modals/ViewTaskModal";
import UpdateTaskModal from "./components/modals/UpdateTaskModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetAllTasksQuery } from "../../features/api/task/taskApiSlice";
import { ITrainee } from "../../interfaces/user.interface";
import { useLocation } from "react-router-dom";
import AssignTaskModal from "../Dashboard/components/AssignTaskModal";
import AddTaskModal from "./components/modals/AddTaskModal";
import { reset } from "../../features/notif/notificationSlice";

interface Props {
  trainee?: ITrainee;
}

const Tasks = ({ trainee }: Props) => {
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAppSelector((state) => state.auth);
  const [add, toggleAdd] = useDisclosure(false);
  const [update, toggleUpdate] = useDisclosure(false);
  const [assign, toggleAssign] = useDisclosure(false);
  const [view, toggleView] = useDisclosure(false);
  const [viewId, setViewId] = useState<string | null>(null);
  const { data: tasks } = useGetAllTasksQuery();
  const [activeTab, setActiveTab] = useState<string | null>("inprogress");

  useDocumentTitle("Tasks");

  return (
    <>
      <Flex justify="space-between">
        <ManageTaskLabels />
        {user?.role === "trainee" && (
          <TaskUrgent
            tasks={tasks!}
            setViewId={setViewId}
            toggle={toggleView.toggle}
          />
        )}

        {user?.role === "Task manager" || user?.role === "QA Personnel" ? (
          <>
            {user.role === "Task manager" && !pathname.includes("profile") && (
              <Button color="cyan" size="xs" onClick={toggleAdd.toggle}>
                Add task
              </Button>
            )}
            {pathname.includes("profile") && (
              <Button color="cyan" size="xs" onClick={toggleAssign.toggle}>
                Assign task
              </Button>
            )}
          </>
        ) : null}
      </Flex>

      {user?.role === "trainee" ? (
        <>
          <Grid className="bg-white hidden md:flex lg:flex" mt={15}>
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
          <Tabs
            value={activeTab}
            onTabChange={setActiveTab}
            color="cyan"
            my={20}
            className="md:hidden lg:hidden bg-white"
          >
            <Tabs.List grow>
              <Tabs.Tab value="new" p={5}>
                <Text
                  c={activeTab === "new" ? "dark" : "gray"}
                  fw="bold"
                  fz="xs"
                >
                  New Task
                </Text>
              </Tabs.Tab>
              <Tabs.Tab value="inprogress" p={0}>
                <Text
                  c={activeTab === "inprogress" ? "dark" : "gray"}
                  fw="bold"
                  fz="xs"
                >
                  InProgress
                </Text>
              </Tabs.Tab>
              <Tabs.Tab value="forqa" p={0}>
                <Text
                  c={activeTab === "forqa" ? "dark" : "gray"}
                  fw="bold"
                  fz="xs"
                >
                  For QA
                </Text>
              </Tabs.Tab>
              <Tabs.Tab value="completed" p={0}>
                <Text
                  c={activeTab === "completed" ? "dark" : "gray"}
                  fw="bold"
                  fz="xs"
                >
                  Completed
                </Text>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="new" pt="xs">
              <NewTask setViewId={setViewId} toggle={toggleView.toggle} />
            </Tabs.Panel>
            <Tabs.Panel value="inprogress" pt="xs">
              <InProgress setViewId={setViewId} toggle={toggleView.toggle} />
            </Tabs.Panel>
            <Tabs.Panel value="forqa" pt="xs">
              <ForQa setViewId={setViewId} toggle={toggleView.toggle} />
            </Tabs.Panel>
            <Tabs.Panel value="completed" pt="xs">
              <Completed setViewId={setViewId} toggle={toggleView.toggle} />
            </Tabs.Panel>
          </Tabs>
        </>
      ) : (
        <TaskTable
          trainee={trainee!}
          setViewId={setViewId}
          view={toggleView.toggle}
        />
      )}

      {/* Modals */}
      <AddTaskModal add={add} toggle={toggleAdd.toggle} />
      <AssignTaskModal
        assignTo={trainee?.name!}
        assign={assign}
        toggle={toggleAssign.toggle}
      />
      <UpdateTaskModal update={update} toggle={toggleUpdate.toggle} />
      <ViewTaskModal
        tasks={tasks}
        viewId={viewId}
        view={view}
        toggleView={toggleView.toggle}
      />
    </>
  );
};

export default Tasks;
