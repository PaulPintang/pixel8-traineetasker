import { Menu, ActionIcon } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { useAppSelector } from "../../../app/hooks";
import { lazy } from "react";

import ModalManageAccounts from "./ModalManageAccounts";
const AccordionDropdown = lazy(() => import("./AccordionDropdown"));

const MenuManageAccounts = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      {user?.role === "admin" ? (
        <Menu shadow="md" position="bottom-end" closeOnItemClick withArrow>
          <Menu.Target>
            <ActionIcon variant="light" radius="xl">
              <IconUsers size={17} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown className="px-3 pb-2">
            <AccordionDropdown />
          </Menu.Dropdown>
        </Menu>
      ) : (
        <ModalManageAccounts />
      )}
    </div>
  );
};

export default MenuManageAccounts;
