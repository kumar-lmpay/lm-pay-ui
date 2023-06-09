import * as yup from 'yup';
import { forms, InputProps } from './forms';
import { AnyObject } from 'yup';
import { Dayjs } from 'dayjs';

type yupBoolean = yup.BooleanSchema<boolean | undefined, AnyObject, boolean | undefined>;
type yupString = yup.StringSchema<string | undefined, AnyObject, string | undefined>;

const generateValidations = (field: InputProps) => {
  let schema: yupBoolean | yupString = yup[field.typeValue || 'string']();

  for (const rule of field.validations) {
    if (rule.type == 'isTrue') {
      schema = yup.boolean().oneOf([true], rule.message) as yupBoolean;
    } else if (rule.type == 'isEmail') {
      schema = (schema as yupString).email(rule.message);
    } else if (rule.type == 'minLength') {
      schema = (schema as yupString).min(rule?.value as number, rule.message);
    } else if (rule.type == 'maxLength') {
      schema = (schema as yupString).max(rule?.value as number, rule.message);
    } else {
      schema = schema.required(rule.message);
    }
  }
  return schema;
};

export const getInputs = (section: string) => {
  const initialValues: { [key: string]: string | number | boolean | Date | Dayjs } = {};

  const validationsFields: {
    [key: string]: yupBoolean | yupString;
  } = {};

  for (const field of forms[section]) {
    initialValues[field.name] = field.value;

    if (!field.validations) continue;

    const schema = generateValidations(field);

    validationsFields[field.name] = schema;
  }
  console.log(forms[section]);

  return {
    validationSchema: yup.object({ ...validationsFields }),
    initialValues,
    inputs: forms[section],
  };
};
