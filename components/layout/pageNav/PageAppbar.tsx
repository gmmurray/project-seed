import {
  Avatar,
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
} from '@mui/material';
import React, { useCallback, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UserNavButton } from './UserNavButton';
import { useIsSmallScreen } from '../../../lib/hooks/useIsSmallScreen';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0/client';

type Props = {
  onDrawerToggle: () => void;
};

const PageAppbar = ({ onDrawerToggle }: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | undefined>(
    undefined,
  );

  const isSmallScreen = useIsSmallScreen();
  const zIndexModifier = isSmallScreen ? 0 : 1;

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: theme => theme.zIndex.drawer + zIndexModifier }}
      color="secondary"
    >
      <Toolbar>
        {isSmallScreen && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Avatar src="/favicon.ico" />
          <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
            Book Critical
          </Typography>
        </Box>
        {user && <UserNavButton user={user} />}
      </Toolbar>
    </AppBar>
  );
};

export default PageAppbar;
