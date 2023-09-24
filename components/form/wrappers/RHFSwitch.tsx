import { Control, Controller } from 'react-hook-form';

import SwitchInput from '../inputs/SwitchInput';
import { SwitchProps } from '@mui/material';

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  inputProps?: SwitchProps;
  helperText?: string;
};

export default function RHFSwitch({
  name,
  label,
  control,
  inputProps,
  helperText,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <SwitchInput
            {...field}
            label={label}
            error={!!error}
            helperText={error?.message ?? helperText}
            switchProps={{
              ...inputProps,
            }}
          />
        );
      }}
    />
  );
}
