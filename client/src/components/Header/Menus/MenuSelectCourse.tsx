import { Flex, Menu, Button, Text, Stack, Badge, Loader } from "@mantine/core";
import { IconSelector, IconCheck } from "@tabler/icons-react";
import { useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { useUpdateCourseViewMutation } from "../../../features/api/account/accountApiSlice";
import LoaderFallback from "../../LoaderFallback";
import { useNavigate } from "react-router-dom";

const MenuSelectCourse = () => {
  const navigate = useNavigate();
  const [courseView, viewState] = useUpdateCourseViewMutation();
  const { user } = useAppSelector((state) => state.auth);
  const [course, setCourse] = useState(user?.course);

  const handleCourseView = async (course: string) => {
    setCourse(course);
    await courseView({ course });
    navigate("dashboard");
  };

  if (viewState.isLoading)
    return <LoaderFallback text="Preparing dashboard..." />;

  return (
    <Menu shadow="md" position="bottom" closeOnItemClick>
      <Menu.Target>
        <Button
          rightIcon={<IconSelector size={15} />}
          variant="light"
          size="xs"
          color="gray"
        >
          <Text c="dark">
            {course === "developer"
              ? "System Development"
              : course === "analyst"
              ? "System Analyst"
              : "UI/UX Designer"}
          </Text>
        </Button>
      </Menu.Target>

      <Menu.Dropdown className="pr-3 py-2">
        <Stack spacing={3} w={205} p={2}>
          <Flex
            justify="space-between"
            align="center"
            className="cursor-pointer"
            onClick={() => handleCourseView("analyst")}
          >
            <Button
              leftIcon={
                <Badge
                  color="teal"
                  variant="filled"
                  radius="sm"
                  size="xs"
                  w={21}
                >
                  S
                </Badge>
              }
              variant="white"
              size="xs"
              color="dark"
            >
              Software Analyst
            </Button>
            {viewState.isLoading && course === "analyst" ? (
              <Loader size="xs" color="gray" />
            ) : (
              course === "analyst" && <IconCheck size={17} />
            )}
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            className="cursor-pointer"
            onClick={() => handleCourseView("developer")}
          >
            <Button
              leftIcon={
                <Badge
                  color="grape"
                  variant="filled"
                  radius="sm"
                  size="xs"
                  w={21}
                >
                  S
                </Badge>
              }
              variant="white"
              size="xs"
              color="dark"
            >
              Software Development
            </Button>
            {viewState.isLoading && course === "developer" ? (
              <Loader size="xs" color="gray" />
            ) : (
              course === "developer" && <IconCheck size={17} />
            )}
          </Flex>

          <Flex
            justify="space-between"
            align="center"
            className="cursor-pointer"
            onClick={() => handleCourseView("designer")}
          >
            <Button
              leftIcon={
                <Badge
                  color="orange"
                  variant="filled"
                  radius="sm"
                  size="xs"
                  w={21}
                >
                  U
                </Badge>
              }
              variant="white"
              size="xs"
              color="dark"
            >
              UI/UX Designer
            </Button>
            {viewState.isLoading && course === "designer" ? (
              <Loader size="xs" color="gray" />
            ) : (
              course === "designer" && <IconCheck size={17} />
            )}
          </Flex>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
};

export default MenuSelectCourse;
