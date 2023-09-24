import { Box, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

type Props = {
  title?: string;
} & PropsWithChildren;

export default function MessageWrapper({ title, children }: Props) {
  return (
    <Box
      sx={{
        height: '30vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!!title && <Typography variant="h6">{title}</Typography>}
      <Box>{children}</Box>
    </Box>
  );
}
