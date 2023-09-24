import { Control, Controller } from 'react-hook-form';
import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';

import React from 'react';
import dayjs from 'dayjs';

type Props = {
  name: string;
  control: Control<any>;
  inputProps?: DateTimePickerProps<any>;
  helperText?: string;
};

export default function RHFDateTimePicker({
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
          <DateTimePicker
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
