import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Flex,
  Image,
  Group,
  Text,
  Menu,
  Badge,
  Stack,
  Loader,
} from "@mantine/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import logo from "../../assets/Pixel8-Official-Logo.jpg";
import avatar from "../../assets/avatar.png";
import { useGoogleLogin } from "@react-oauth/google";
import {
  IconArrowRightTail,
  IconCheck,
  IconClock,
  IconLogout,
  IconSelector,
  IconSettings,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";
import axios from "axios";
import { setUser, logout } from "../../features/auth/authSlice";
import {
  useLoginMutation,
  useLogoutUserMutation,
} from "../../features/api/auth/authApiSlice";
import { useState } from "react";
import { useUpdateCourseViewMutation } from "../../features/api/account/accountApiSlice";
import { useEffect } from "react";
import MenuSelectCourse from "./Menus/MenuSelectCourse";
import MenuEditSchedule from "./Menus/MenuEditSchedule";
import MenuManageAccounts from "./Menus/MenuManageAccounts";
import { socket } from "../../utils/socketConnect";

type Link = {
  isActive: boolean;
  isPending: boolean;
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const [loginUser, loginState] = useLoginMutation();
  const [logoutUser, logoutState] = useLogoutUserMutation();
  const [courseView, viewState] = useUpdateCourseViewMutation();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [course, setCourse] = useState(user?.course);
  const [menuCouse, setMenuCourse] = useState(false);

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
        // ? OAuth return email info, and do a POST request to create account in database
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
        <Image src={logo} width={205} className="relative" left={-20} />
      </NavLink>
      <Group
        spacing={
          user?.role === "admin" || user?.role === "supervisor" ? 15 : 15
        }
      >
        {user && user?.role !== "admin" && pathname === "/" && (
          <NavLink to="dashboard" className="text-white">
            <Button size="xs" color="cyan" variant="white">
              Your Dashboard
            </Button>
          </NavLink>
        )}

        {user && user?.role !== "admin" && user.course && pathname !== "/" && (
          <Badge color="teal" variant="dot" className="text-gray-700">
            <Group spacing={4}>
              <Text className="capitalize">{user.course}</Text>
              <Text className="capitalize">{user.role}</Text>
            </Group>
          </Badge>
        )}

        {user && user?.role !== "trainee" && (
          <>
            {user?.role === "admin" && <MenuSelectCourse />}
            <Group spacing={8}>
              {user?.role === "admin" && <MenuEditSchedule />}
              {user?.role === "supervisor" || user.role === "admin" ? (
                <MenuManageAccounts />
              ) : (
                ""
              )}
            </Group>
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
              <Menu.Item className="text-red-400 bg-white hover:bg-white p-0">
                <Button
                  leftIcon={<IconLogout size={15} />}
                  variant="white"
                  size="xs"
                  color="red"
                  onClick={handleOnLogout}
                  loading={logoutState.isLoading}
                >
                  Sign out
                </Button>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button
            onClick={() => GoogleUseAuth()}
            size="xs"
            color="cyan"
            loading={loginState.isLoading}
          >
            Login to start
          </Button>
        )}
      </Group>
    </Flex>
  );
};

export default Header;
