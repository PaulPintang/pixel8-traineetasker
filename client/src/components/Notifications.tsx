import {
  Indicator,
  Avatar,
  Group,
  Stack,
  Text,
  ScrollArea,
} from "@mantine/core";
import TimeAgo from "../routes/Tasks/components/modals/ViewTask/components/TimeAgo";
import { useGetNotificationQuery } from "../features/api/notification/notificationApiSlice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setView } from "../features/notif/notificationSlice";

const Notifications = () => {
  const { data: notifications } = useGetNotificationQuery();
  const dispatch = useAppDispatch();
  return (
    <>
      <ScrollArea.Autosize mah={290} scrollbarSize={7}>
        {notifications
          ?.slice()
          .reverse()
          ?.map((notif) => (
            <Link
              key={notif.date}
              to="tasks"
              onClick={() => dispatch(setView(notif.task))}
            >
              <Indicator size={8} pb={5} position="top-start" offset={8}>
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
                    {/* <Text c="dimmed" fz="xs">
                      Today at 08:32 PM (20 mins ago)
                    </Text> */}
                    <TimeAgo timestamp={notif.date!} />
                    {notif.type === "comment" && (
                      <div className="bg-gray-100 px-2 py-1 rounded-md">
                        <Text c="dimmed" fz="xs" className="truncate w-[230px]">
                          {notif.comment}
                        </Text>
                      </div>
                    )}
                  </Stack>
                </Group>
              </Indicator>
            </Link>
          ))}
      </ScrollArea.Autosize>
    </>
  );
};

export default Notifications;
