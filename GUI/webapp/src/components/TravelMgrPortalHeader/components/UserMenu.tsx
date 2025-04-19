import { useState} from 'react'
import { Avatar, Menu, UnstyledButton } from "@mantine/core"
import cx from 'clsx';
import { useLogout } from '@/api/hooks';
import { LogOut } from "lucide-react";
import classes from './UserMenu.module.scss'

interface UserMenuProps {
    firstName: string;
    lastName: string;
    email: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({firstName, lastName, email}) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const handleLogout = useLogout()

  return(
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Avatar radius="xl" size="md">
            {`${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
          </Avatar>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <div className= {classes.dropDownLabel}>{`${firstName} ${lastName}`}</div>
          <div className= {classes.dropDownSubLabel}>{`${email}`}</div>
        </Menu.Label>

        <Menu.Divider />

        {/* <Menu.Label>Settings</Menu.Label> */}
        {/* <Menu.Item leftSection={<Settings size={16} strokeWidth={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item leftSection={<SwitchCamera size={16} strokeWidth={1.5} />}>
          Change account
        </Menu.Item> */}
        <Menu.Item onClick={handleLogout} leftSection={<LogOut size={16} strokeWidth={1.5} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}