import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActionIcon, Container, Flex, Group, Space, Text } from '@mantine/core';
import { LayoutDashboard, UserPlus, FileText, Settings, Bell } from 'lucide-react';
import { UserMenu } from './components/UserMenu';
import { useAuth } from '@/contexts/AuthContext'
import styles from './TravelMgrPortalHeader.module.scss';


const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/guest-invite', label: 'Guest Invite', icon: UserPlus },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

export const TravelMgrPortalHeader: FC = () => {
  
  // get auth details
  const { authState } = useAuth();
  const companyId = authState.user?.company_id || '';
  const userFirstName = authState.user?.first_name || "";
  const userLastName = authState.user?.last_name || "";
  const email = authState.user?.email || "";
  
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
            <UserMenu 
              firstName={userFirstName}
              lastName={userLastName}
              email = {email}
            />
            
          </Group>

        </Flex>
        </Container>
    </div>
  );
};