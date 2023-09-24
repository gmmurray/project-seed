import { Control, Controller } from 'react-hook-form';

import SwitchInput from '../inputs/SwitchInput';
import { SwitchProps } from '@mui/material';

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  inputProps?: SwitchProps;
};

export default function RHFSwitch({ name, label, control, inputProps }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <SwitchInput
            {...field}
            label={label}
            switchProps={{
              ...inputProps,
            }}
          />
        );
      }}
    />
  );
}
