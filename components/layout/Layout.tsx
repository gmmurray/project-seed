import { Box, Container, Toolbar } from '@mui/material';
import { Fragment, PropsWithChildren, useCallback, useState } from 'react';

import ConfirmationProvider from '../shared/ConfirmationProvider';
import PageAppbar from './pageNav/PageAppbar';
import PageDrawer from './pageNav/PageDrawer';
import ScrollTopButton from './ScrollTopButton';
import { SnackbarAlertProvider } from './SnackbarProvider';
import { pageRouteMap } from '../../lib/routes/pageRoutes';
import { useRouter } from 'next/router';

type Props = {} & PropsWithChildren;

export default function Layout({ children }: Props) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    () => setDrawerOpen(state => !state),
    [],
  );

  const isLandingPage = router.pathname === pageRouteMap.root.href;

  const renderChildren = () => {
    if (isLandingPage) {
      return children;
    }

    return (
      <Box sx={{ display: 'flex' }}>
        <PageAppbar onDrawerToggle={handleDrawerToggle} />
        <PageDrawer open={drawerOpen} onToggle={handleDrawerToggle} />
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar id="back-to-top-anchor" />
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
    );
  };

  return (
    <Fragment>
      <SnackbarAlertProvider>
        <ConfirmationProvider>
          {renderChildren()}
          <ScrollTopButton />
        </ConfirmationProvider>
      </SnackbarAlertProvider>
    </Fragment>
  );
}
