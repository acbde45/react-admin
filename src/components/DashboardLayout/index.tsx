import { styled } from '@material-ui/core/styles';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

import DashboardNavbar from '@/components/DashboardNavbar';
import DashboardSidebar from '@/components/DashboardSidebar';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%',
}));

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256,
  },
}));

const Container = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

const Content = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});

function DashboardLayout(): JSX.Element {
  return (
    <Root>
      <DashboardNavbar />
      <DashboardSidebar />
      <Wrapper>
        <Container>
          <Content>
            <Outlet />
          </Content>
        </Container>
      </Wrapper>
    </Root>
  );
}

const memoized = React.memo(DashboardLayout);

memoized.displayName = 'DashboardLayout';

export default memoized;
