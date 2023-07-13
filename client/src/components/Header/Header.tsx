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
