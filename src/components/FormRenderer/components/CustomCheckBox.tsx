import React from 'react';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { ErrorMessage, useField } from 'formik';

interface Props {
  label: string;
  name: string;
}

export const CustomCheckBox = (props: Props) => {
  const [field] = useField(props);

  return (
    <Grid item xs={12} sx={{ my: 2 }}>
      <FormControlLabel
        label={props.label}
        control={<Checkbox {...field} {...props} />}
        sx={{
          '& .MuiButtonBase-root': { paddingTop: 0, paddingBottom: 0 },
        }}
      />
      {props.name}
      <ErrorMessage name={props.name} component="span" className="error" />
    </Grid>
  );
};
