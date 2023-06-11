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
} from "@mantine/core";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import logo from "../assets/Pixel8-Official-Logo.jpg";
import avatar from "../assets/avatar.png";
import { useGoogleLogin } from "@react-oauth/google";
import { IconLogout } from "@tabler/icons-react";
import axios from "axios";
import { setUser, logout } from "../features/auth/authSlice";

type Link = {
  isActive: boolean;
  isPending: boolean;
};

const Header = () => {
  const location = useLocation();
  const { pathname } = location;

  const GoogleUseAuth = useGoogleLogin({
    onSuccess: (res) => {
      const OAuth = async () => {
        const auth = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          }
        );
        // do the query
        console.log(auth);
      };

      OAuth().catch((error) => console.log(error));
    },
  });

  return (
    <Flex justify="space-between" align="center">
      <Image src={logo} width={205} className="relative" left={-20} />
      <Group>
        {/* {pathname !== "/" && (
          <NavLink to="/" className="text-white">
            <Button size="xs" color="cyan" variant="white">
              Documentation
            </Button>
          </NavLink>
        )}

        {pathname === "/" && (
          <NavLink to="dashboard" className="text-white">
            <Button size="xs" color="cyan" variant="white">
              Your Dashboard
            </Button>
          </NavLink>
        )} */}
        {/* <Badge color="teal" variant="dot" className="text-gray-700">
          Administrator
        </Badge> */}
        {/* <Badge color="teal" variant="dot" className="text-gray-700">
          Designer
        </Badge> */}
        <Button onClick={() => GoogleUseAuth()}>Login to start</Button>
        <Menu shadow="md" width={150} position="bottom-end">
          <Menu.Target>
            <ActionIcon radius="xl" size={38} variant="transparent">
              <Avatar radius={100} src={avatar} alt="" size={38} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Your account</Menu.Label>
            <Menu.Divider />
            <Menu.Item className="text-red-400" icon={<IconLogout size={15} />}>
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Flex>
  );
};

export default Header;
