import { Box, Rating, RatingProps, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import React from 'react';

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  inputProps?: RatingProps;
  helperText?: string;
};

export default function RHFRating({
  name,
  label,
  control,
  inputProps = {},
  helperText,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        let labelColor: string | undefined;
        if (fieldState.error) {
          labelColor = 'error';
        } else if (inputProps.disabled) {
          labelColor = 'text.disabled';
        } else {
          labelColor = undefined;
        }
        return (
          <Box>
            <Typography component="legend" variant="body2" color={labelColor}>
              {label}
            </Typography>
            <Box>
              <Rating
                {...inputProps}
                {...field}
                onChange={(_, value) => field.onChange(value)}
              />
            </Box>
            <Typography
              color={fieldState.error ? 'error' : undefined}
              variant="caption"
            >
              {fieldState.error?.message ?? helperText}
            </Typography>
          </Box>
        );
      }}
    />
  );
}
