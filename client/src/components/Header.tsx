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
} from "@mantine/core";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import logo from "../assets/Pixel8-Official-Logo.jpg";
import avatar from "../assets/avatar.png";
import { useGoogleLogin } from "@react-oauth/google";
import {
  IconArrowRightTail,
  IconCheck,
  IconLogout,
  IconSelector,
} from "@tabler/icons-react";
import axios from "axios";
import { setUser, logout } from "../features/auth/authSlice";
import {
  useLoginMutation,
  useLogoutUserMutation,
} from "../features/api/auth/authApiSlice";

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
        // ? OAuth return email info, and do a POST request to create account in database
        const user = await loginUser({ name, email, picture }).unwrap();
        dispatch(setUser(user));
        user.role !== "admin" && navigate("dashboard");
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
      <Image src={logo} width={205} className="relative" left={-20} />
      <Group>
        {user && user.role !== "admin" && pathname !== "/" && (
          <NavLink to="/" className="text-white">
            <Button size="xs" color="cyan" variant="white">
              Documentation
            </Button>
          </NavLink>
        )}

        {user && user?.role !== "admin" && pathname === "/" && (
          <NavLink to="dashboard" className="text-white">
            <Button size="xs" color="cyan" variant="white">
              Your Dashboard
            </Button>
          </NavLink>
        )}

        {user && user?.role !== "admin" && user.course && (
          <Badge color="teal" variant="dot" className="text-gray-700">
            {user?.course}
          </Badge>
        )}

        {user?.role === "admin" && (
          <>
            <Menu shadow="md" position="bottom">
              <Menu.Target>
                <Button
                  rightIcon={<IconSelector size={15} />}
                  variant="white"
                  size="xs"
                  color="dark"
                >
                  Software Development
                </Button>
              </Menu.Target>

              <Menu.Dropdown className="pr-3">
                <Stack spacing={3} w={220} p={2}>
                  <Flex
                    justify="space-between"
                    align="center"
                    className="cursor-pointer"
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
                    {/* <IconCheck size={17} /> */}
                  </Flex>
                  <Flex justify="space-between" align="center">
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
                    <IconCheck size={17} />
                  </Flex>
                  <Flex justify="space-between" align="center">
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
                  </Flex>
                </Stack>
              </Menu.Dropdown>
            </Menu>
          </>
        )}

        {user ? (
          <Menu shadow="md" position="bottom-end">
            <Menu.Target>
              <ActionIcon radius="xl" size={38} variant="transparent">
                <Avatar
                  radius={100}
                  src={user?.picture}
                  alt=""
                  size={38}
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
