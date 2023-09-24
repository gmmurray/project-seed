import { Button, ButtonProps, Menu, MenuItem, MenuProps } from '@mui/material';
import React, { Fragment, useCallback, useState } from 'react';

import { toggleArrayEle } from '../../lib/util/arrayUtil';

type MultiOptionMenuProps<T> = {
  buttonText: string;
  options: {
    name: string | React.JSX.Element;
    value: T;
  }[];
  value: T[];
  onChange: (value: T[]) => any;
  buttonProps?: ButtonProps;
  menuProps?: MenuProps;
  closeOnEmpty?: boolean;
  disabled?: boolean;
};
export default function MultiOptionMenu<T>({
  buttonText,
  options,
  value,
  onChange,
  buttonProps,
  menuProps,
  closeOnEmpty = false,
  disabled = false,
}: MultiOptionMenuProps<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  const handleClose = useCallback(() => setAnchorEl(undefined), []);

  const handleChange = useCallback(
    (element: T) => {
      const newValue = toggleArrayEle(element, value);
      onChange(newValue);
      if (newValue.length === 0 && closeOnEmpty) {
        handleClose();
      }
    },
    [value, onChange, closeOnEmpty, handleClose],
  );

  return (
    <Fragment>
      <Button
        {...(buttonProps ?? {})}
        onClick={e => setAnchorEl(e.currentTarget)}
        disabled={disabled}
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
          const isSelected = value.includes(option.value);
          return (
            <MenuItem
              key={key}
              selected={isSelected}
              onClick={() => handleChange(option.value)}
              disabled={disabled}
            >
              {option.name}
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
}
