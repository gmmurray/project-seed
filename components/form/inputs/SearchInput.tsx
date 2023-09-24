import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React, { useCallback } from 'react';

import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  value: string;
  onChange: (value: string) => any;
  onReset?: () => any;
  inputProps?: TextFieldProps;
};

export default function SearchInput({
  value,
  onChange,
  onReset,
  inputProps = {},
}: Props) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange],
  );

  const handleReset = useCallback(() => {
    onChange('');

    if (onReset) {
      onReset();
    }
  }, [onChange, onReset]);

  return (
    <TextField
      {...inputProps}
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment:
          value && value.length > 0 ? (
            <ResetButton onClick={handleReset} />
          ) : undefined,
      }}
    />
  );
}

type ResetButtonProps = {
  onClick: () => any;
};

const ResetButton = ({ onClick }: ResetButtonProps) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onClick}>
        <ClearIcon />
      </IconButton>
    </InputAdornment>
  );
};
