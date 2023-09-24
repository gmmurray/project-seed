import { Control, Controller } from 'react-hook-form';

import React from 'react';
import SelectInput from '../inputs/SelectInput';
import { SelectProps } from '@mui/material';

type Props<T> = {
  name: string;
  label: string;
  options: {
    name: string;
    value: T;
  }[];
  helperText?: string;
  inputProps?: SelectProps;
  control: Control<any>;
};
export default function RHFSelect<T extends string>({
  name,
  label,
  options,
  helperText,
  inputProps,
  control,
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState }) => {
        return (
          <SelectInput
            {...field}
            label={label}
            options={options}
            selectProps={{ ...inputProps, ref }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message ?? helperText}
          />
        );
      }}
    />
  );
}
