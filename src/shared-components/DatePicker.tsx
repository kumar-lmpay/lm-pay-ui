import React from 'react';
import { Grid } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { ErrorMessage, useFormikContext } from 'formik';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface Props {
  name: string;
  type: string;
  placeholder?: string;
  [x: string]: any;
  value?: string;
  label: string;
  format: any;
}

export const CustomDatePicker = (props: Props) => {
  const formikProps = useFormikContext();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        value={props.value ? dayjs(props.value) : null}
        onChange={(value) => {
          formikProps.setFieldValue(props.name, value?.format(props.format));
        }}
        format={props.format}
        slotProps={{ textField: { size: 'small' } }}
      />
    </LocalizationProvider>
  );
};
