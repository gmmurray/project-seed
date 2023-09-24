import { FormControlLabel, Switch, SwitchProps } from '@mui/material';
import React, { useCallback } from 'react';

type Props = {
  name: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => any;
  switchProps?: SwitchProps;
};

export default function SwitchInput({
  name,
  label,
  value,
  onChange,
  switchProps,
}: Props) {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked);
    },
    [onChange],
  );
  return (
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
  );
}
