import { Card, Center, Image, Text, Button, Box, Flex } from "@mantine/core";
import empty from "../../../assets/emptytodo.png";

const TasksTodoCard = () => {
  return (
    <Card className="h-full rounded-md shadow-md ">
      <Flex direction="column" align="center" gap={10}>
        <Image src={empty} width={130} />
        <Text fw="bold" c="dark">
          Don't have any new todo?
        </Text>
        <Button size="sm" color="teal">
          Add todos
        </Button>
      </Flex>
    </Card>
  );
};

export default TasksTodoCard;
