import React from 'react';
import { Grid, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useField } from 'formik';

interface Props {
  label: string;
  value?: string | number | Date | Dayjs;
  name: string;
  type: string;
  placeholder?: string;
}

export const CustomTextInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name); // use props.name instead of props
  // console.log(props);

  const { label, name, type, placeholder } = props; // Destructure the props

  return (
    <>
      <Grid item xs={12} sm={6} sx={{ my: 4 }}>
        <TextField
          fullWidth
          multiline
          {...field}
          label={label} // Pass the properties to TextField
          name={name}
          type={type}
          placeholder={placeholder}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          onBlur={() => helpers.setTouched(true)}
        />
        {/* <ErrorMessage name={props.name} component="span" className="error" /> */}
      </Grid>
    </>
  );
};
