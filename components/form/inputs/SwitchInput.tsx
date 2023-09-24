import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  SwitchProps,
} from '@mui/material';
import React, { useCallback } from 'react';

type Props = {
  name: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => any;
  switchProps?: SwitchProps;
  helperText?: string;
  error?: boolean;
};

export default function SwitchInput({
  name,
  label,
  value,
  onChange,
  switchProps,
  helperText,
  error = false,
}: Props) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    },
    [onChange],
  );
  return (
    <FormControl>
      <FormControlLabel
        label={label}
        control={
          <Switch
            {...(switchProps ?? {})}
            checked={value}
            onChange={handleChange}
            name={name}
          />
        }
      />
      {!!helperText && (
        <FormHelperText error={error} sx={{ ml: 0 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}
