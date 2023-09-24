import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Fragment, useCallback, useState } from 'react';

import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { apiRouteMap } from '../../../lib/routes/apiRoutes';
import { pageRouteMap } from '../../../lib/routes/pageRoutes';
import { useRouter } from 'next/router';

type UserNavButtonProps = {
  user: UserProfile;
};

export const UserNavButton = ({ user }: UserNavButtonProps) => {
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | undefined>(
    undefined,
  );

  const router = useRouter();

  const handleAvatarClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setMenuAnchor(event.currentTarget);
    },
    [],
  );

  const handleCloseClick = useCallback((event: any) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    setMenuAnchor(undefined);
  }, []);

  const handleLogoutClick = useCallback(() => {
    handleCloseClick(undefined);
    router.push(apiRouteMap.auth.children.logout.path());
  }, [handleCloseClick, router]);

  return (
    <Fragment>
      <IconButton onClick={handleAvatarClick}>
        <Avatar src={user.picture ?? undefined}>
          {(user.nickname ?? 'User')[0]}
        </Avatar>
      </IconButton>
      <Menu
        open={!!menuAnchor}
        onClose={handleCloseClick}
        anchorEl={menuAnchor}
        slotProps={{
          paper: {
            sx: { minWidth: '200px' },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <UserNavMenuItem
          icon={<LogoutIcon />}
          text="Logout"
          onClick={handleLogoutClick}
        />
      </Menu>
    </Fragment>
  );
};

type UserNavMenuItemProps = {
  icon: React.JSX.Element;
  text: string;
  onClick: () => any;
};
const UserNavMenuItem = ({ icon, text, onClick }: UserNavMenuItemProps) => {
  return (
    <MenuItem onClick={onClick}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <Typography variant="body1" sx={{ ml: 1 }}>
          {text}
        </Typography>
      </Box>
    </MenuItem>
  );
};
