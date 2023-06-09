import React from 'react';
import { Formik, Form } from 'formik';
import {
  CustomRadioGroup,
  CustomDatePicker,
  CustomTextInput,
  CustomSelect,
  CustomPassword,
  CustomCheckBox,
} from './components';
import { getInputs } from './utils';
import { Button, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';
import { Dayjs } from 'dayjs';

interface InitialValues {
  type?: 'text' | 'radio-group' | 'email' | 'password' | 'select' | 'checkbox' | 'datepicker';
  name?: string | number | Date | Dayjs;
  value?: string | number | Date | Dayjs;
  validations?: Validation[];
  placeholder?: string;
  typeValue?: 'string' | 'boolean';
  label?: string;
  options?: Opt[];
  format?: string;
}

export interface Opt {
  value: string | number;
  desc: string;
}

export interface Validation {
  type: 'required' | 'isEmail' | 'minLength' | 'isTrue' | 'maxLength';
  value?: string | number | boolean;
  message: string;
}

export const DynamicForm = ({ name }: { name: string }) => {
  let initialValues: InitialValues = {};
  let inputs: {
    type: 'text' | 'radio-group' | 'email' | 'password' | 'select' | 'checkbox' | 'datepicker';
    name: string;
    value: string | number | Date | Dayjs;
    validations: Validation[];
    placeholder?: string;
    typeValue?: 'string' | 'boolean';
    label?: string;
    options?: Opt[];
    format?: string;
  }[] = []; // add type annotation
  let validationSchema = null;

  // if (Object.keys(populatedData).length === 0) {
  const inputsData = getInputs(name);
  console.log('initial values', inputsData.initialValues);
  initialValues = inputsData.initialValues;
  inputs = inputsData.inputs;
  validationSchema = inputsData.validationSchema;
  // } else {
  //   const inputsData = getInputs(name);
  //   initialValues = populatedData;
  //   inputs = inputsData.inputs;
  //   validationSchema = inputsData.validationSchema;
  // }

  return (
    <Card>
      {/* <CardHeader title={name} titleTypographyProps={{ variant: "h6" }} /> */}
      <CardContent>
        <Formik
          {...{ initialValues, validationSchema }}
          onSubmit={(values) => {
            // if (Object.keys(populatedData).length === 0) {
            alert('inside ..' + String(name));
            console.log(values);
            alert(JSON.stringify(values, null, 2));
            setTimeout(() => {
              axios
                .post(process.env.NEXT_PUBLIC_API_URL + 'data?table_name=' + String(name), values)
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error.response);
                });
              console.log({ values });
              // alert(JSON.stringify(values, null, 2));
            }, 400);
            // } else {
            // alert("inside .." + String(name));
            // console.log(values);
            // // alert(JSON.stringify(values, null, 2));
            // delete values.id;
            // console.log('id deleted from values', values);
            // setTimeout(() => {
            //   axios
            //     .put(
            //       process.env.NEXT_PUBLIC_API_URL +
            //         'data?table_name=' +
            //         String(name) +
            //         '&primary_key=' +
            //         String(populatedData.id),
            //       values,
            //     )
            //     .then((response) => {
            //       console.log(response);
            //     })
            //     .catch((error) => {
            //       console.log(error.response);
            //     });
            //   console.log({ values });
            // alert(JSON.stringify(values, null, 2));
            // }, 400);
            // }
          }}
        >
          {() => (
            <Form noValidate>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {inputs.map(({ name, type, value, label, placeholder, format, options }) => {
                  value = (initialValues as { [key: string]: string | number | Date | Dayjs })[name];
                  if (type == 'datepicker') {
                    return (
                      <div key={name} style={{ flexBasis: '50%', paddingRight: '10px' }}>
                        <CustomDatePicker
                          key={name}
                          label={label}
                          name={name}
                          value={value}
                          placeholder={placeholder}
                          // type={''}
                          format={format}
                        />
                      </div>
                    );
                  } else if (type == 'password') {
                    return (
                      <div key={name} style={{ flexBasis: '50%', paddingRight: '10px' }}>
                        <CustomPassword label={label} name={name} value={value} type="password" />
                      </div>
                    );
                  } else if (type == 'select') {
                    return (
                      <div key={name} style={{ flexBasis: '50%', paddingRight: '10px' }}>
                        <CustomSelect label={label} name={name} options={options} />
                      </div>
                    );
                  } else if (type == 'radio-group') {
                    return (
                      <div key={name} style={{ flexBasis: '50%', paddingRight: '10px' }}>
                        <CustomRadioGroup label={label} name={name} options={options} />
                      </div>
                    );
                  } else if (type == 'checkbox') {
                    return (
                      <div key={name} style={{ flexBasis: '60%', paddingRight: '10px' }}>
                        <CustomCheckBox label={label} name={name} />
                      </div>
                    );
                  } else {
                    return (
                      <div key={name} style={{ flexBasis: '50%', paddingRight: '10px' }}>
                        <CustomTextInput
                          label={label}
                          name={name}
                          value={value}
                          placeholder={placeholder}
                          type={type}
                        />
                      </div>
                    );
                  }
                })}
              </div>
              <br />
              <Grid container spacing={3} textAlign="center" justifyContent="center">
                <Grid item xs={3}>
                  <Button variant="contained" color="error" type="reset" fullWidth>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" type="submit" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
