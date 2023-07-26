import {
  Indicator,
  Avatar,
  Group,
  Stack,
  Text,
  ScrollArea,
  Button,
  Flex,
  Badge,
  Menu,
} from "@mantine/core";
import TimeAgo from "../routes/Tasks/components/modals/ViewTask/components/TimeAgo";
import {
  useGetNotificationQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from "../features/api/notification/notificationApiSlice";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setView } from "../features/notif/notificationSlice";
import { useGetAllTasksQuery } from "../features/api/task/taskApiSlice";
import { useGetAllAccountQuery } from "../features/api/account/accountApiSlice";
import { IconChecks } from "@tabler/icons-react";

const Notifications = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: notifications } = useGetNotificationQuery();
  const { data: tasks } = useGetAllTasksQuery();
  const { data: accounts } = useGetAllAccountQuery();
  const [readAll, { isLoading }] = useReadAllNotificationMutation();
  const [readNotification] = useReadNotificationMutation();
  const dispatch = useAppDispatch();
  return (
    <ScrollArea.Autosize mah={290} scrollbarSize={7}>
      {user?.role === "trainee" ? (
        <>
          {notifications?.length === 0 ? (
            <Text fz="sm" c="dimmed">
              No new notification!
            </Text>
          ) : (
            <>
              <Flex align="center" justify="space-between" pb={10}>
                <Text fw="bold" c="dark">
                  Notifications
                </Text>
                <Button
                  onClick={readAll}
                  variant="white"
                  size="xs"
                  compact
                  leftIcon={
                    <IconChecks size={15} className="relative left-1" />
                  }
                  loading={isLoading}
                >
                  Mark all as read
                </Button>
              </Flex>
              {notifications
                ?.slice()
                .reverse()
                ?.map((notif) => (
                  <Menu.Item className="p-0 hover:bg-white">
                    <Link
                      key={notif.date}
                      to="tasks"
                      onClick={() => {
                        dispatch(setView(notif.task));
                        readNotification({ _id: notif._id! });
                      }}
                    >
                      <Indicator
                        size={8}
                        pb={5}
                        position="top-start"
                        offset={8}
                      >
                        <Group
                          align="start"
                          spacing={10}
                          className="hover:bg-gray-50 px-3 py-1 rounded-md cursor-pointer transition-all"
                        >
                          <Avatar
                            mt={5}
                            radius={100}
                            src={notif.from.picture}
                            alt=""
                            size={36}
                            imageProps={{ referrerPolicy: "no-referrer" }}
                          />
                          <Stack spacing={0}>
                            <Text c="dark" fz="sm">
                              {notif.content}
                            </Text>
                            <Group spacing={10}>
                              <Text c="dark" fz="xs">
                                Task name:
                              </Text>
                              <Text c="dimmed" fz="xs">
                                {notif.task}
                              </Text>
                            </Group>
                            <TimeAgo timestamp={notif.date!} />
                            {notif.type === "comment" && (
                              <div className="bg-gray-100 px-2 py-1 rounded-md">
                                <Text
                                  c="dimmed"
                                  fz="xs"
                                  className="truncate w-[230px]"
                                >
                                  {notif.comment}
                                </Text>
                              </div>
                            )}
                          </Stack>
                        </Group>
                      </Indicator>
                    </Link>
                  </Menu.Item>
                ))}
            </>
          )}
        </>
      ) : (
        <>
          {tasks?.filter((task) => task.status === "forqa").length === 0 ? (
            <Text fz="sm" c="dimmed">
              No new notification!
            </Text>
          ) : (
            <>
              <Flex align="center" justify="space-between" pb={10}>
                <Text fw="bold" c="dark">
                  To check tasks
                </Text>
                <Badge
                  size="sm"
                  color="indigo"
                  variant="light"
                  className="lowercase"
                >
                  {tasks?.filter((task) => task.status === "forqa").length}
                </Badge>
              </Flex>

              {tasks
                ?.filter((task) => task.status === "forqa")
                .map((task) => {
                  const account = accounts?.find(
                    (acc) => acc.name === task.assign
                  );
                  return (
                    <Link
                      key={task._id}
                      to="tasks"
                      onClick={() => {
                        dispatch(setView(task.taskname));
                      }}
                    >
                      <Indicator
                        disabled
                        size={8}
                        pb={5}
                        position="top-start"
                        offset={8}
                      >
                        <Group
                          align="start"
                          spacing={10}
                          className="hover:bg-gray-50 px-3 py-1 rounded-md cursor-pointer transition-all"
                        >
                          <Avatar
                            mt={5}
                            radius={100}
                            src={account?.picture}
                            alt=""
                            size={36}
                            imageProps={{ referrerPolicy: "no-referrer" }}
                          />
                          <Stack spacing={0}>
                            <Text c="dark" fz="sm">
                              {`${account?.name} marks this task as forqa`}
                            </Text>
                            <Group spacing={10}>
                              <Text c="dark" fz="xs">
                                Task name:
                              </Text>
                              <Text c="dimmed" fz="xs">
                                {task.taskname}
                              </Text>
                            </Group>
                            <Text c="dimmed" fz="xs">
                              {task.timeline?.doneAt}
                            </Text>
                            {/* <TimeAgo timestamp={task.timeline?.doneAt!} /> */}
                          </Stack>
                        </Group>
                      </Indicator>
                    </Link>
                  );
                })}
            </>
          )}
        </>
      )}
    </ScrollArea.Autosize>
  );
};

export default Notifications;
