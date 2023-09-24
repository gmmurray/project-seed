import { Box, Typography } from '@mui/material';

import { apiRouteMap } from '../lib/routes/apiRoutes';
import { pageRouteMap } from '../lib/routes/pageRoutes';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function LandingPage() {
  const { user } = useUser();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h2" component="h1">
          Project Seed
        </Typography>
      </Box>
    </Box>
  );
}
