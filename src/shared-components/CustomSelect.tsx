/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Autocomplete, TextField, FormControl, Grid } from '@mui/material';
import { useField } from 'formik';

interface Props {
  options: Opt[];
  label: string;
  name: string;
  [x: string]: any;
  handleOnChange?: any;
}

type Opt = { code: string | number; description: string };

export const CustomSelect = ({ label, handleOnChange = () => {}, ...props }: Props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <Autocomplete
      {...props}
      options={props.options}
      getOptionLabel={(option) => option.description}
      onChange={(_, value) => {
        handleOnChange(value), helpers.setValue(value?.code || '');
      }}
      onBlur={() => helpers.setTouched(true)}
      value={props.options.find((option) => option.code === field.value) || null}
      freeSolo={false}
      selectOnFocus={true}
      renderInput={(params) => (
        <FormControl fullWidth>
          <TextField
            {...params}
            label={label}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
          />
        </FormControl>
      )}
      fullWidth
      size="small"
    />
  );
};
