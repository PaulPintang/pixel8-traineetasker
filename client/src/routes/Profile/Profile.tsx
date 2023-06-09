import { Grid, Text, Group, Flex, Image, Button, Divider } from "@mantine/core";
import TaskCards from "../Dashboard/components/TaskCards";
import { TasksLabels } from "../../components/ColorLabels";
import InfoCard from "../Dashboard/components/InfoCard";
import avatar from "../../assets/avatar.png";
import Tasks from "../Tasks/Tasks";
import { useParams } from "react-router-dom";
import { members } from "../Dashboard/components/MembersTableCard";
import RemoveTraineeModal from "./RemoveTraineeModal";
import { useDisclosure } from "@mantine/hooks";

const Profile = () => {
  const [remove, { toggle }] = useDisclosure(false);
  const { id } = useParams();

  const user = members.find((member) => member.id === Number(id));
  return (
    <>
      <Grid>
        <Grid.Col span="content">
          <Flex direction="column" align="center" justify="center" gap="xs">
            <Image src={avatar} width={100} />
            <Flex direction="column" align="center">
              <Text c="dark" fw="bold" fz="sm">
                {user?.name}
              </Text>
              <Text c="dimmed" fz="xs">
                Bicol University Polangui Campus
              </Text>
              <Text c="dimmed" fz="xs">
                paulpintang@gmail.com
              </Text>

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
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span="auto" className="space-y-1">
          <TasksLabels />
          <TaskCards />
        </Grid.Col>
        <Grid.Col span="content">
          <InfoCard />
        </Grid.Col>
      </Grid>
      <Divider my={20} />
      <Tasks />
      <RemoveTraineeModal remove={remove} toggle={toggle} />
    </>
  );
};

export default Profile;
