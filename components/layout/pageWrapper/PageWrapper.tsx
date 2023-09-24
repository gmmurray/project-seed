import { Box, Container, Grid, Typography } from '@mui/material';
import PageWrapperActions, {
  PageWrapperActionsProps,
} from './PageWrapperActions';
import PageWrapperBackAction, {
  PageWrapperBackActionProps,
} from './PageWrapperBackAction';
import React, { Fragment, PropsWithChildren } from 'react';

import Head from 'next/head';

export type PageWrapperProps = {
  headerTitle: string;
  actions?: {
    back?: PageWrapperBackActionProps['action'];
    menu?: PageWrapperActionsProps['actions'];
  };
  pageTitle: string;
} & PropsWithChildren;
export default function PageWrapper({
  headerTitle: title,
  actions = {},
  pageTitle,
  children,
}: PageWrapperProps) {
  return (
    <Fragment>
      <Head>
        <title>{`${pageTitle} - Date Vault`}</title>
      </Head>
      <Container sx={{ height: '100%', pb: 2 }}>
        <Grid container sx={{ alignItems: 'start' }}>
          {actions.back && (
            <Grid item xs={12}>
              <PageWrapperBackAction action={actions.back} />
            </Grid>
          )}
          <Grid item xs={12} md sx={{ flex: 1 }}>
            <Typography variant="h2" component="h1">
              {title}
            </Typography>
          </Grid>
          {!!actions.menu && actions.menu.length > 0 && (
            <Grid
              item
              xs={12}
              md="auto"
              sx={{
                mb: {
                  xs: 2,
                  md: undefined,
                },
              }}
            >
              <PageWrapperActions actions={actions.menu} />
            </Grid>
          )}
        </Grid>
        <Box>{children}</Box>
      </Container>
    </Fragment>
  );
}
