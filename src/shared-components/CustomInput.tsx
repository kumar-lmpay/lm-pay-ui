import React from 'react';
import { Grid, TextField } from '@mui/material';
import { ErrorMessage, useField } from 'formik';

interface Props {
  name: string;
  type: string;
  placeholder?: string;
  [x: string]: any;
}

export const CustomTextInput = (props: Props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <TextField
      fullWidth
      size="small"
      {...field}
      {...props}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      onBlur={() => helpers.setTouched(true)}
    />
  );
};
