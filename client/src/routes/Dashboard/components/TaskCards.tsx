import { Flex, Card, Text, ActionIcon, Grid } from "@mantine/core";
import {
  Icon24Hours,
  IconCalendarCheck,
  IconFilePower,
  IconSquareRoundedCheck,
  IconStar,
  IconUrgent,
} from "@tabler/icons-react";
import React from "react";

const TaskCards = () => {
  return (
    <Grid grow>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          <div className="bg-teal-300 w-8 h-1"></div>
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconStar size={18} />
            </ActionIcon>
            <Text fz={13} c="dimmed">
              New Tasks
            </Text>
            <Text>1</Text>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          <div className="bg-red-300 w-8 h-1"></div>
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconUrgent size={18} />
            </ActionIcon>
            <Text fz={13} c="dimmed">
              Failed
            </Text>
            <Text>1</Text>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          <div className="bg-green-300 w-8 h-1"></div>
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconSquareRoundedCheck size={18} />
            </ActionIcon>
            <Text fz={13} c="dimmed">
              Completed
            </Text>
            <Text>1</Text>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          <div className="bg-teal-300 w-8 h-1"></div>
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <Icon24Hours size={18} />
            </ActionIcon>
            <Text fz={13} c="dimmed">
              Hours
            </Text>
            <Text>219</Text>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          <div className="bg-violet-400 w-8 h-1"></div>
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconFilePower size={18} />
            </ActionIcon>
            <Text fz={13} c="dimmed">
              Pending
            </Text>
            <Text>20</Text>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col className="bg-re d-300" span={4}>
        <Card className="h-[80px] bg-opacity-60 rounded-md shadow-md ">
          <div className="bg-green-300 w-8 h-1"></div>
          <Flex pt={10} justify="space-between" align="center">
            <ActionIcon radius={50} disabled>
              <IconCalendarCheck size={18} />
            </ActionIcon>
            <Text fz={13} c="dimmed">
              Total Today
            </Text>
            <Text>1</Text>
          </Flex>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default TaskCards;
