import { Control, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

import React from 'react';

type Props = {
  name: string;
  control: Control<any>;
  inputProps?: TextFieldProps;
};
export default function RHFTextField({
  name,
  control,
  inputProps = {},
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <TextField
            {...inputProps}
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error?.message ?? inputProps.helperText}
          />
        );
      }}
    />
  );
}
