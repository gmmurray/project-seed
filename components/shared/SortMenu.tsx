import {
  Button,
  ButtonProps,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
} from '@mui/material';
import React, { Fragment, useCallback, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Sort } from '../../lib/types/sortTypes';

type SortMenuProps<T extends string> = {
  buttonText: string;
  options: {
    name: string;
    value: T;
  }[];
  value?: Sort<T>;
  defaultSortDir: Sort<T>['dir'];
  onChange: (value: Sort<T>) => any;
  buttonProps?: ButtonProps;
  menuProps?: MenuProps;
  closeOnChange?: boolean;
  disabled?: boolean;
};

export default function SortMenu<T extends string>({
  buttonText,
  options,
  value,
  defaultSortDir,
  onChange,
  buttonProps,
  menuProps,
  closeOnChange = false,
  disabled = false,
}: SortMenuProps<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  const handleClose = useCallback(() => setAnchorEl(undefined), []);

  const handleChange = useCallback(
    (newSortOrder: T) => {
      let newSortDir: Sort<T>['dir'];
      if (value?.order === newSortOrder) {
        newSortDir = value.dir === 'asc' ? 'desc' : 'asc';
      } else {
        newSortDir = defaultSortDir;
      }
      onChange({
        order: newSortOrder,
        dir: newSortDir,
      });
      if (closeOnChange) {
        handleClose();
      }
    },
    [closeOnChange, defaultSortDir, handleClose, onChange, value],
  );

  const icon =
    value?.dir === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;

  return (
    <Fragment>
      <Button
        {...(buttonProps ?? {})}
        disabled={disabled}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        {buttonText}
      </Button>
      <Menu
        {...(menuProps ?? {})}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {options.map((option, key) => {
          const isSelected = option.value === value?.order;
          return (
            <MenuItem
              key={key}
              selected={isSelected}
              onClick={() => handleChange(option.value)}
              disabled={disabled}
            >
              <ListItemIcon>{isSelected && icon}</ListItemIcon>
              <ListItemText primary={option.name} />
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
}
