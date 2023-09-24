import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import React, { useCallback } from 'react';

type Props<T> = {
  name: string;
  label: string;
  value: T;
  options: {
    name: string;
    value: T;
  }[];
  onChange: (value: T) => any;
  selectProps?: SelectProps;
  helperText?: string;
  error?: boolean;
};

export default function SelectInput<T extends string>({
  name,
  label,
  value,
  onChange,
  options,
  selectProps,
  helperText,
  error = false,
}: Props<T>) {
  const handleChange = useCallback(
    (event: SelectChangeEvent<any>) => {
      onChange(event.target.value as T);
    },
    [onChange],
  );

  return (
    <FormControl fullWidth error={error} variant={selectProps?.variant}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...(selectProps ?? {})}
        name={name}
        value={value}
        onChange={handleChange}
        label={label}
      >
        {options.map((option, key) => {
          return (
            <MenuItem key={key} value={option.value}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
