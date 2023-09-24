import { Box } from '@mui/material';
import PageWrapper from '../components/layout/pageWrapper/PageWrapper';
import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

function HomePage() {
  return (
    <PageWrapper headerTitle="Home" pageTitle="Home">
      <Box sx={{ mt: 2 }}>hi</Box>
    </PageWrapper>
  );
}

export default withPageAuthRequired(HomePage);
