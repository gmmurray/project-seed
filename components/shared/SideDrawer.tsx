import { Box, Drawer, IconButton, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';

import CloseIcon from '@mui/icons-material/Close';

export type SideDrawerProps = {
  open: boolean;
  title: string;
  onClose: () => any;
} & PropsWithChildren;
export default function SideDrawer({
  open,
  title,
  onClose,
  children,
}: SideDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          minWidth: { xs: '50vw', md: '30vw' },
        },
      }}
    >
      <Box sx={{ height: '100%', width: '100%', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">{title}</Typography>
          <IconButton onClick={onClose} sx={{ ml: 'auto' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Drawer>
  );
}
