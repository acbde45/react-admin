import { Box, Drawer, List } from '@material-ui/core';
import * as React from 'react';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from 'react-feather';

import NavItem from '@/components/NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers',
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Products',
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login',
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register',
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error',
  },
];

function DashboardSidebar(): JSX.Element {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map(item => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open
      variant="persistent"
      PaperProps={{
        sx: {
          width: 256,
          top: 64,
          height: 'calc(100% - 64px)',
        },
      }}
    >
      {content}
    </Drawer>
  );
}

const memoized = React.memo(DashboardSidebar);

memoized.displayName = 'DashboardSidebar';

export default memoized;
