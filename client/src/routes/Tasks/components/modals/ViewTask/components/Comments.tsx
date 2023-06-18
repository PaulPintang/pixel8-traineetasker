import React from "react";
import { ITask } from "../../../../../../interfaces/task.interface";
import { Paper, Text, Group, Flex, Image } from "@mantine/core";
import { IAccount } from "../../../../../../interfaces/user.interface";
import { useGetAllAccountQuery } from "../../../../../../features/api/account/accountApiSlice";

export interface Props {
  assign: string;
  user: IAccount;
  task: ITask;
}

const Comments = ({ task, user, assign }: Props) => {
  const { data: accounts } = useGetAllAccountQuery();
  return (
    <section className="space-y-3">
      {task?.comments?.map((item) => {
        const commentBy = accounts?.find((acc) => acc.name === item.by);
        return (
          <Paper component="div" className="bg-slate-50 space-y-2" p={11}>
            <Text fz="xs" c="dark">
              {item.msg}
            </Text>
            <Flex
              align="center"
              justify="space-between"
              direction={item.by === user?.name ? "row-reverse" : "row"}
            >
              <Group spacing={10}>
                <Image
                  src={commentBy?.picture}
                  width={20}
                  radius="xl"
                  imageProps={{ referrerPolicy: "no-referrer" }}
                />
                <Text fz="xs" fw="bold">
                  {item.by}
                </Text>
              </Group>
              <Text c="dimmed" fz="xs">
                2 min ago
              </Text>
            </Flex>
          </Paper>
        );
      })}
    </section>
  );
};

export default Comments;
