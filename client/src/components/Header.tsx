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
} from "@mantine/core";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import logo from "../assets/Pixel8-Official-Logo.jpg";
import avatar from "../assets/avatar.png";
import MainButton from "./MainButton";
import { IconLogout } from "@tabler/icons-react";

type Link = {
  isActive: boolean;
  isPending: boolean;
};

const Header = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return (
    <Flex justify="space-between" align="center">
      <Image src={logo} width={205} className="relative" left={-20} />
      <Group>
        {/* <MainButton>Login to start</MainButton> */}
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
