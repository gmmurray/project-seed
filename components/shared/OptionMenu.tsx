import { Button, ButtonProps, Menu, MenuItem, MenuProps } from '@mui/material';
import React, { Fragment, useCallback, useState } from 'react';

type OptionMenuProps<T> = {
  buttonText: string;
  options: {
    name: string | React.JSX.Element;
    value: T;
  }[];
  value: T | undefined;
  onChange: (value: T | undefined) => any;
  buttonProps?: ButtonProps;
  menuProps?: Partial<MenuProps>;
  closeOnChange?: boolean;
  disabled?: boolean;
};
export default function OptionMenu<T>({
  buttonText,
  options,
  value,
  onChange,
  buttonProps,
  menuProps,
  closeOnChange = false,
  disabled = false,
}: OptionMenuProps<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  const handleClose = useCallback(() => setAnchorEl(undefined), []);

  const handleChange = useCallback(
    (newValue: T) => {
      onChange(newValue === value ? undefined : newValue);
      if (closeOnChange) {
        handleClose();
      }
    },
    [closeOnChange, handleClose, onChange, value],
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
          const isSelected = option.value === value;
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
