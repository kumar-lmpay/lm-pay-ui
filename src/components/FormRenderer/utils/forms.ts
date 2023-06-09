import { Dayjs } from 'dayjs';
export interface InputProps {
  type: 'text' | 'radio-group' | 'email' | 'password' | 'select' | 'checkbox' | 'datepicker';
  name: string;
  value: string | number | Date | Dayjs;
  validations: Validation[];
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

// transaction form = {
//   "LMSenderFirstName": "",
//   "LMSenderLastName": "",
//   "LMSenderAddress": "",
//   "LMSenderCity": "",
//   "LMSenderState": "",
//   "LMSenderPostal/ZipCode": "",
//   "LMSenderNationality": "",
//   "LMSenderIDType": "",
//   "LMSenderIDNumber": "",
//   "LMSenderAddressCountry": "",
//   "LMSenderDOB": "",
//   "LMSenderMobileISDPrefix": "",
//   "LMSenderMobileNumber": "",
//   "LMDestinationCountry": "",
//   "LMReceiverFirstName": "",
//   "LMReceiverLastName": "",
//   "LMReceiverAddress": "",
//   "LMReceiverCity": "",
//   "LMReceiverMobileISDPrefix": "",
//   "LMReceiverMobileNmber": "",
//   "LMReceiverNationality": "",
//   "LMSendPurposeoftransfer": "",
//   "LMSourceofIncome": "",
//   "LMDeliveryOption": "",
//   "LMSendChannel": "",
//   "LMSendAudience": "",
//   "LMReceiveAgentCode": "",
//   "LMSendCurrency": "",
//   "LMReceiveCurrency": "",
//   "LMAmount": "",
//   "LMSenderGender": "",
//   "LMRelationshipwithReceiverList": "",
//   "LMRelationshipwithReceiver": "",
//   "LMSenderPlaceofBirth": "",
//   "LMSenderCountryOfBirth": "",
//   "LMSenderOccupation": "",
//   "LMSenderOccupationList": "",
//   "LMSenderIDIssueDate": "",
//   "LMSenderIDExpiryDate": "",
//   "LMSenderSecondaryIDType": "",
//   "LMSenderSecondaryIDnumber": "",
//   "LMSenderProofOfFund": "",
//   "LMSenderIDIssuanceCountry": "",
//   "LMSender'sFamilyName": "",
//   "LMSendPaymentMode": "",
//   "LMReceiverState": "",
//   "LMReciverlandmark": "",
//   "LMReceiverZipCode": "",
//   "LMReceiverIDType": "",
//   "LMReceiverIDName": "",
//   "LMReceiverIDnumber": "",
//   "LMReceiverDOB": "",
//   "LMReceiverOtherName": "",
//   "LMReceiverProofOfaddress": "",
//   "LMRelationshipwithSender": "",
//   "LMReceiverMediumOfPayment": "",
//   "LMReceiverPurposeofTransaction": "",
//   "LMReceiverIDIssueDate": "",
//   "LMReceiverIDExpiryDate": "",
//   "LMReceiverSecondaryIDType": "",
//   "LMReceiverSecondaryIDnumber": "",
//   "LMReceiverIDIssuanceCountry": "",
//   "LMReceiverAccountType": "",
//   "LMReceiver IBAN": "",
//   "LMReceiverAccountNumber": "",
//   "LMReceiverMobilewalletNUmber": "",
//   "LMReceiverBankIdentificationCode": "",
//   "LMReceiverBank SubCode": "",
//   "LMReceiverIdentificationNumber": "",
//   "LMReceivingInstituationList": "",
//   "LMReceivingInstituation": "",
//   "LMReceiverBranchName": "",
//   "LMReceiverBranchAddress": "",
//   "LMReceiverBranchCity": "",
//   "LMReceiverBranchaddress": "",
//   "LMReceiverCardNumber": "",
//   "LMBillerCode": "",
//   "LMBillerAccountNumber": "",
//   "LMBillerAgent": "",
//   "LMSessionID": ""
// }

export const forms: { [x: string]: InputProps[] } = {
  // axios fetch all by form_name or get it from local json
  transaction: [
    //create a form for transaction with all the fields and validations
    {
      type: 'text',
      name: 'LMSenderFirstName',
      placeholder: 'First Name',
      value: '',
      validations: [
        {
          type: 'minLength',
          value: 3,
          message: 'Min. 3 characters',
        },
        {
          type: 'required',
          message: 'First Name is required',
        },
        {
          type: 'maxLength',
          value: 20,
          message: 'Max. 20 characters',
        },
      ],
    },
    {
      type: 'text',
      name: 'LMSenderLastName',
      placeholder: 'Last Name',
      value: '',
      validations: [
        { type: 'minLength', value: 3, message: 'Min. 3 characters' },
        { type: 'required', message: 'Last Name is required' },
        { type: 'maxLength', value: 20, message: 'Max. 20 characters' },
      ],
    },
    {
      type: 'text',
      name: 'LMSenderAddress',
      placeholder: 'Address',
      value: '',
      validations: [
        { type: 'minLength', value: 3, message: 'Min. 3 characters' },
        { type: 'required', message: 'Address is required' },
        { type: 'maxLength', value: 20, message: 'Max. 20 characters' },
      ],
    },
    {
      type: 'text',
      name: 'LMSenderCity',
      placeholder: 'City',
      value: '',
      validations: [
        { type: 'minLength', value: 3, message: 'Min. 3 characters' },
        { type: 'required', message: 'City is required' },
        { type: 'maxLength', value: 20, message: 'Max. 20 characters' },
      ],
    },
    // {
    //   type: 'text',
    //   name: 'LMSenderState',
    //   placeholder: 'State',
    //   value: '',
    //   validations: [
    //     { type: 'minLength', value: 3, message: 'Min. 3 characters' },
    //     { type: 'required', message: 'State is required' },
    //     { type: 'maxLength', value: 20, message: 'Max. 20 characters' },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMSenderPostal/ZipCode',
    //   placeholder: 'Postal/Zip Code',
    //   value: '',
    //   validations: [
    //     { type: 'minLength', value: 3, message: 'Min. 3 characters' },
    //     { type: 'required', message: 'Postal/Zip Code is required' },
    //     { type: 'maxLength', value: 20, message: 'Max. 20 characters' },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMSenderNationality',
    //   placeholder: 'Country',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'Nationality is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 20,
    //       message: 'Max. 20 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMSenderIDType',
    //   placeholder: 'ID Type',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'ID Type is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 20,
    //       message: 'Max. 20 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMSenderIDNumber',
    //   placeholder: 'ID Number',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'ID Number is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 20,
    //       message: 'Max. 20 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMSenderAddressCountry',
    //   placeholder: 'Address Country',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'Country is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 20,
    //       message: 'Max. 20 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMSenderDOB',
    //   placeholder: 'Date of Birth',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'Date of Birth is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 20,
    //       message: 'Max. 20 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMSenderMobileISDPrefix',
    //   placeholder: 'Mobile ISD Prefix',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'Mobile ISD Prefix is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 3,
    //       message: 'Max. 3 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMSenderMobileNumber',
    //   placeholder: 'Mobile Number',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 10,
    //       message: 'Min. 10 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'Mobile Number is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 12,
    //       message: 'Max. 12 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMDestinationCountry',
    //   placeholder: 'Destination Country',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'Destination Country is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 20,
    //       message: 'Max. 20 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMRecieverFirstName',
    //   placeholder: 'Reciever First Name',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'Reciever First Name is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 20,
    //       message: 'Max. 20 characters',
    //     },
    //   ],
    // },
    // {
    //   type: 'text',
    //   name: 'LMRecieverLastName',
    //   placeholder: 'Reciever Last Name',
    //   value: '',
    //   validations: [
    //     {
    //       type: 'minLength',
    //       value: 3,
    //       message: 'Min. 3 characters',
    //     },
    //     {
    //       type: 'required',
    //       message: 'Reciever Last Name is required',
    //     },
    //     {
    //       type: 'maxLength',
    //       value: 20,
    //       message: 'Max. 20 characters',
    //     },
    //   ],
    // },
  ],
};
