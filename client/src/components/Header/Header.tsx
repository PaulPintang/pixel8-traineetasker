import {
  ActionIcon,
  Avatar,
  Button,
  Flex,
  Image,
  Group,
  Text,
  Menu,
  Badge,
} from "@mantine/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import logo from "../../assets/Pixel8-Official-Logo.jpg";
import { useGoogleLogin } from "@react-oauth/google";
import { IconLogout } from "@tabler/icons-react";
import axios from "axios";
import { setUser, logout } from "../../features/auth/authSlice";
import {
  useLoginMutation,
  useLogoutUserMutation,
} from "../../features/api/auth/authApiSlice";
import { useState } from "react";
import { useUpdateCourseViewMutation } from "../../features/api/account/accountApiSlice";
import MenuSelectCourse from "./Menus/MenuSelectCourse";
import MenuManageAccounts from "./Menus/MenuManageAccounts";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [loginUser, loginState] = useLoginMutation();
  const [logoutUser, logoutState] = useLogoutUserMutation();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const GoogleUseAuth = useGoogleLogin({
    onSuccess: (res) => {
      const OAuth = async () => {
        const account = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          }
        );
        const { name, email, picture } = account.data;
        const user = await loginUser({ name, email, picture }).unwrap();
        dispatch(setUser(user));
        navigate("dashboard");
      };

      OAuth().catch((err) => console.log(err));
    },
  });

  const handleOnLogout = () => {
    logoutUser()
      .unwrap()
      .then(() => {
        dispatch(logout());
        navigate("/");
      });
  };

  // function addTimeStrings(time1, time2) {
  //   const timeToMinutes = (time) => {
  //     const regex = /^((\d+)day(s)?)? ?((\d+)hr(s)?)? ?((\d+)min(s)?)?$/;
  //     const match = time.match(regex);

  //     if (match) {
  //       const days = match[2] ? parseInt(match[2]) : 0;
  //       const hrs = match[5] ? parseInt(match[5]) : 0;
  //       const mins = match[8] ? parseInt(match[8]) : 0;
  //       return days * 24 * 60 + hrs * 60 + mins;
  //     } else {
  //       throw new Error(
  //         `Invalid time format: ${time}. Expected format: "XXdays XXhrs XXmins".`
  //       );
  //     }
  //   };

  //   const minutesToTime = (minutes) => {
  //     const days = Math.floor(minutes / (24 * 60));
  //     minutes %= 24 * 60;
  //     const hrs = Math.floor(minutes / 60);
  //     const mins = minutes % 60;

  //     let timeString = "";
  //     if (days > 0) {
  //       timeString += `${days}day${days > 1 ? "s" : ""}`;
  //     }
  //     if (hrs > 0) {
  //       if (timeString) {
  //         timeString += " ";
  //       }
  //       timeString += `${hrs}hr${hrs > 1 ? "s" : ""}`;
  //     }
  //     if (mins > 0) {
  //       if (timeString) {
  //         timeString += " ";
  //       }
  //       timeString += `${mins}min${mins > 1 ? "s" : ""}`;
  //     }

  //     return timeString;
  //   };

  //   try {
  //     const minutes1 = timeToMinutes(time1);
  //     const minutes2 = timeToMinutes(time2);
  //     const totalMinutes = minutes1 + minutes2;

  //     console.log(minutesToTime(totalMinutes));
  //   } catch (error) {
  //     console.error(error.message);
  //     return ""; // Return an empty string or appropriate value if there's an error.
  //   }
  // }

  // Example usage:
  // const time1 = "20mins";
  // const time2 = "1day20mins";
  // const totalTime = addTimeStrings(time1, time2);
  // console.log(totalTime);

  return (
    <Flex justify="space-between" align="center">
      <NavLink to="/" className="text-white">
        <div className="w-[160px] md:w-[180px] lg:w-[180px]">
          <Image src={logo} className="relative" left={-20} />
        </div>
      </NavLink>
      <Group spacing={15}>
        {user && user?.role !== "admin" && user.course && pathname !== "/" && (
          <Badge
            color="teal"
            variant="dot"
            className="text-gray-700 hidden md:flex lg:flex"
          >
            <Group spacing={4}>
              <Text className="capitalize">{user.course}</Text>
              <Text className="capitalize">{user.role}</Text>
            </Group>
          </Badge>
        )}

        {user && user?.role !== "trainee" && (
          <>
            {user?.role === "admin" && <MenuSelectCourse />}
            {/* <Group spacing={8}> */}
            {/* {user?.role === "admin" && <MenuEditSchedule />} */}
            {user?.role === "supervisor" || user.role === "admin" ? (
              <MenuManageAccounts />
            ) : (
              ""
            )}
            {/* </Group> */}
          </>
        )}

        {user ? (
          <Menu shadow="md" position="bottom-end">
            <Menu.Target>
              <ActionIcon radius="xl" size={38}>
                <Avatar
                  radius={100}
                  src={user?.picture}
                  alt=""
                  size={36}
                  imageProps={{ referrerPolicy: "no-referrer" }}
                />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown className="">
              <Menu.Label>
                <Text fw="bold">{user.name}</Text>
                <Text>{user.email}</Text>
              </Menu.Label>
              <Menu.Divider />
              <div onClick={handleOnLogout} className="hover:cursor-pointer">
                <Button
                  leftIcon={<IconLogout size={15} />}
                  variant="white"
                  size="xs"
                  color="red"
                  loading={logoutState.isLoading}
                >
                  Sign out
                </Button>
              </div>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button
            onClick={() => GoogleUseAuth()}
            size="xs"
            color="cyan"
            loading={loginState.isLoading}
            radius={0}
          >
            Login to start
          </Button>
        )}
      </Group>
    </Flex>
  );
};

export default Header;
