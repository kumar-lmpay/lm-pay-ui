import React from 'react';
import { Autocomplete, TextField, FormControl, Grid } from '@mui/material';
import { useField } from 'formik';

interface Props {
  options: Opt[];
  label: string;
  name: string;
  // handleOnChange: (value: Opt) => void;
}

type Opt = { value: string | number; desc: string };

export const CustomSelect = ({ label, ...props }: Props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <Grid item xs={12} sm={6} sx={{ my: 4 }}>
        <Autocomplete
          {...props}
          options={props.options}
          getOptionLabel={(option) => option.desc}
          // onChange={(_, value) => {
          //   handleOnChange(value), helpers.setValue(value?.value || '');
          // }}
          onBlur={() => helpers.setTouched(true)}
          value={props.options.find((option) => option.value === field.value) || null}
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
        />
      </Grid>
    </>
  );
};
