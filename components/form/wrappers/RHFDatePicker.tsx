import { Control, Controller } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

import React from 'react';
import dayjs from 'dayjs';

type Props = {
  name: string;
  control: Control<any>;
  inputProps?: DatePickerProps<any>;
  helperText?: string;
};

export default function RHFDatePicker({
  name,
  control,
  inputProps = {},
  helperText,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <DatePicker
            {...inputProps}
            {...field}
            value={dayjs(field.value)}
            slotProps={{
              textField: {
                error: !!fieldState.error,
                helperText: fieldState.error?.message ?? helperText,
                fullWidth: true,
              },
            }}
          />
        );
      }}
    />
  );
}
