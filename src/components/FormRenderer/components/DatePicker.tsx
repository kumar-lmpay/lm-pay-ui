import React from 'react';
import { Grid } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { ErrorMessage, useFormikContext } from 'formik';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface Props {
  label: string;
  value: string | number | Date | Dayjs;
  name: string;
  placeholder: string;
  format: string;
}

export const CustomDatePicker = (props: Props) => {
  const formikProps = useFormikContext();
  return (
    <>
      <Grid item xs={12} sm={6} sx={{ my: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label={props.label}
            value={props.value ? dayjs(props.value) : null}
            onChange={(value) => {
              formikProps.setFieldValue(props.name, value?.format(props.format));
            }}
            format={props.format}
          />
        </LocalizationProvider>
      </Grid>
      <ErrorMessage name={props.name} component="span" className="error" />
    </>
  );
};
