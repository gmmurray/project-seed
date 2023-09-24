import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuItemProps,
} from '@mui/material';
import React, { Fragment, useCallback, useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export type PageWrapperActionsProps = {
  actions: MenuAction[];
};
export default function PageWrapperActions({
  actions,
}: PageWrapperActionsProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((callback?: Function) => {
    if (callback) {
      callback();
    }
    setAnchorEl(undefined);
  }, []);

  return (
    <Fragment>
      <IconButton onClick={handleOpen}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => handleClose()}
        slotProps={{
          paper: {
            sx: { minWidth: '150px' },
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {actions.map((action, index) => {
          const menuItemProps: MenuItemProps = {
            ...(action.menuItemProps ?? {}),
            onClick: () => handleClose(action.onClick),
          };

          return (
            <MenuItem {...menuItemProps} key={index}>
              {!!action.icon && (
                <ListItemIcon key={`${index}-icon`}>{action.icon}</ListItemIcon>
              )}
              <ListItemText inset={!action.icon} key={`${index}-text`}>
                {action.text}
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
}

type MenuAction = {
  onClick: () => any;
  text: string;
  icon?: React.JSX.Element;
  menuItemProps?: MenuItemProps;
};
