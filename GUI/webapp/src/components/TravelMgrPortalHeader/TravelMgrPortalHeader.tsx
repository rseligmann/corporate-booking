import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActionIcon, Avatar, Container, Flex, Group, Space, Text } from '@mantine/core';
import { LayoutDashboard, UserPlus, FileText, Settings, Bell } from 'lucide-react';
import styles from './TravelMgrPortalHeader.module.scss';


const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/guest-invite', label: 'Guest Invite', icon: UserPlus },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];



export const TravelMgrPortalHeader: FC = () => {
  const location = useLocation();

  const items = navigationItems.map(({ path, label, icon: Icon }) => (
    <Link
      key={path}
      to={path}
      className={`${styles.navLink} ${
        location.pathname === path ? styles.navLinkActive : ''
      }`}
    >
      <Icon className={styles.navIcon} size={20} />
      <span>{label}</span>
    </Link>
  ));

  return (
    <div className={styles.header}>
        <Container size="xl">
        <Flex align = "center" justify="space-between" className={styles.headerContent}>

          <Group>
            <Text size="xl" fw={700} className={styles.logo}>
              TravelPortal
            </Text>

            <Space w="sm"/>

            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
          </Group>

          <Group>
            <ActionIcon 
              variant="subtle" 
              size="lg"
              className={styles.iconButton}
            >
              <Bell size={20} />
            </ActionIcon>
            <Avatar radius="xl" size="md">SA</Avatar>
          </Group>

        </Flex>
        </Container>
    </div>
  );
};