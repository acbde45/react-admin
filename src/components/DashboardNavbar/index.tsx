import { AppBar, Box, Toolbar } from '@material-ui/core';
import * as React from 'react';

interface IProps {
  [key: string]: unknown;
}

function DashboardNavbar(props: IProps): JSX.Element {
  return (
    <AppBar elevation={0} {...props}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}

const memoized = React.memo(DashboardNavbar);

memoized.displayName = 'DashboardNavbar';

export default memoized;
