import { Button, ListItem } from '@material-ui/core';
import * as React from 'react';
import { matchPath, NavLink as RouterLink, useLocation } from 'react-router-dom';

interface IProps {
  href: string;
  icon: React.ElementType;
  title: string;
  [key: string]: unknown;
}

function NavItem(props: IProps): JSX.Element {
  const { href, icon: Icon, title, ...rest } = props;
  const location = useLocation();

  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main',
          }),
          '& svg': {
            mr: 1,
          },
        }}
        to={href}
      >
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
}

const memoized = React.memo(NavItem);

memoized.displayName = 'NavItem';

export default memoized;
