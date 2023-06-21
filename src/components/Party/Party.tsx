/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { filter, get, map } from 'lodash';
import * as Yup from 'yup';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {
  CustomRadioGroup,
  CustomDatePicker,
  CustomTextInput,
  CustomSelect,
  CustomPassword,
  CustomCheckBox,
} from '../../shared-components';

import {
  masterDataUrl,
  partyApi,
  partyIdAPIURL,
  partyAddressAPIURL,
  bankTransfterAPIURL,
  mobileWalletAPIURL,
} from '../../constant';

import style from './Party.scss';

interface InitialValues {
  partyNumber: number;
  partyType: string;
  partySubType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  primaryEmail: string;
  secondaryEmail: string;
  dob: string;
  primaryMobile: string;
  secondaryMobile: string;
  gender: string;
  placeOfBirth: string;
  countryOfBirth: string;
  country: string;
  familyName: string;
  occupation: string;
  proofOfFund: string;
  accountType: string;
  accountNumber: string;
  iban: string;
  bankSubCode: string;
  bankIdentificationCode: string;
  bankName: string;
  branchName: string;
  branchAddress: string;
  branchCity: string;
  branchState: string;
  lmBankBranchCode: string;
  cpCity: string;
  cpState: string;
  cpPostBox: string;
  cpAddress1: string;
  cpAddress2: string;
  mobileWalletNumber: string;
}

interface PartyIdInitialValues {
  idType: string;
  customerNo: string;
  issueDate: string;
  expiryDate: string;
}

interface PartyIAddressInitialValues {
  customerNo: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
}

interface Option {
  code: string;
  description: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Party = (): JSX.Element => {
  const initialValues: InitialValues = {
    partyNumber: 0,
    partyType: '',
    partySubType: '',
    firstName: '',
    middleName: '',
    lastName: '',
    primaryEmail: '',
    secondaryEmail: '',
    dob: '',
    primaryMobile: '',
    secondaryMobile: '',
    gender: '',
    placeOfBirth: '',
    countryOfBirth: '',
    country: '',
    familyName: '',
    occupation: '',
    proofOfFund: '',
    accountType: '',
    accountNumber: '',
    iban: '',
    bankSubCode: '',
    bankIdentificationCode: '',
    bankName: '',
    branchName: '',
    branchAddress: '',
    branchCity: '',
    branchState: '',
    lmBankBranchCode: '',
    cpCity: '',
    cpState: '',
    cpPostBox: '',
    cpAddress1: '',
    cpAddress2: '',
    mobileWalletNumber: '',
  };

  const partyIdInitialValues: PartyIdInitialValues = {
    idType: '',
    customerNo: '',
    issueDate: '',
    expiryDate: '',
  };

  const partyIAddressInitialValues: PartyIAddressInitialValues = {
    customerNo: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
  };

  const validationSchema = Yup.object().shape({
    partyType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    partySubType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    primaryEmail: Yup.string().email('Invalid email').required('Required'),
    gender: Yup.string().min(1, 'Too Short!').max(50, 'Too Long!').required('Required'),
    dob: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    familyName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    primaryMobile: Yup.string().min(10, 'Too Short!').max(10, 'Too Long!').required('Required'),
    placeOfBirth: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    countryOfBirth: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    country: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    occupation: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    proofOfFund: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  const partyIdValidationSchema = Yup.object().shape({
    idType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    customerNo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    issueDate: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    expiryDate: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  const partyAddressValidationSchema = Yup.object().shape({
    address1: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    customerNo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    address2: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    city: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    state: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    zipcode: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  });

  const [parySubTypeOptions, setPartySubTypeOptions] = React.useState([]);
  const [partySubType, setPartySubType] = React.useState('');
  const [countryList, setCountryList] = React.useState([]);
  const [occupationList, setOccupationList] = React.useState([]);
  const [sourceOfIncomeList, setSourceOfIncomeList] = React.useState([]);
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [partyList, setPartyList] = React.useState<Option[]>([]);
  const [partyNumber, setPartyNumber] = React.useState('');
  const [dynamicValidationSchema, setDynamicValidationSchema] = React.useState<any>(validationSchema);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [aletMessage, setAlertMessage] = React.useState('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchMasterData = async () => {
    setLoading(true);
    await axios
      .get(masterDataUrl)
      .then((res) => {
        const countryList = filter(get(res, 'data.data.result', []), (item) => item.code_type === 'Country');
        const occupationList = filter(get(res, 'data.data.result', []), (item) => item.code_type === 'Profession');
        const sourceOfIncomeList = filter(get(res, 'data.data.result', []), (item) => item.code_type === 'Source');
        setCountryList(countryList);
        setOccupationList(occupationList);
        setSourceOfIncomeList(sourceOfIncomeList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  const fetchPartyData = async () => {
    setLoading(true);
    await axios
      .get(partyApi)
      .then((res) => {
        console.log('Response', res);
        const customerList: Option[] = [];
        map(res.data, (item) => {
          customerList.push({
            code: item.partyNo,
            description: `${item.firstName} ${item.lastName} - ${item.partyNo}`,
          });
        });
        setPartyList(customerList);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMasterData();
    fetchPartyData();
  }, []);

  const partyType: Option[] = [
    { code: 'customer', description: 'Customer' },
    { code: 'beneficiary', description: 'Beneficiary' },
  ];

  const customerPartySubType: Option[] = [
    { code: 'individual', description: 'Individual' },
    { code: 'corporate ', description: 'Corporate' },
  ];

  const beneficiaryPartySubType: Option[] = [
    { code: 'bankTransfer', description: 'Bank Transfer' },
    { code: 'cashPickup', description: 'Cash Pickup' },
    { code: 'mobileWallet', description: 'Mobile Wallet' },
  ];

  const genderOptions: Option[] = [
    { code: 'M', description: 'Male' },
    { code: 'F ', description: 'Female' },
    { code: 'O ', description: 'Other' },
  ];

  const accountType: Option[] = [
    { code: 'Savings account', description: 'Savings account' },
    { code: 'Current account', description: 'Current account' },
    { code: 'Overseas Indians', description: 'Overseas Indians' },
    { code: 'Fixed deposit', description: 'Fixed deposit' },
    { code: 'Joint account', description: 'Joint account' },
  ];

  const idProof = [
    { code: 'aadhaarcard', description: 'Aadhaar Card' },
    { code: 'Passport', description: 'Passport' },
    { code: 'drivinglicense', description: 'Driving License' },
    { code: 'Visa', description: 'Visa' },
  ];

  const handlePartyChange = (value: Option) => {
    value.code === 'customer'
      ? setPartySubTypeOptions(customerPartySubType)
      : setPartySubTypeOptions(beneficiaryPartySubType);
  };

  const handleParySubTypeChange = (value: Option) => {
    if (value.code === 'bankTransfer') {
      const validationSchema = Yup.object().shape({
        partyNumber: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
        partyType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        partySubType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        iban: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        accountType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        accountNumber: Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('Required'),
        bankIdentificationCode: Yup.string().min(10, 'Too Short!').max(50, 'Too Long!').required('Required'),
        bankSubCode: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        bankName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        branchName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        branchAddress: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        branchCity: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        branchState: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        lmBankBranchCode: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      });
      setDynamicValidationSchema(validationSchema);
    }
    if (value.code === 'mobileWallet') {
      const validationSchema = Yup.object().shape({
        partyNumber: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
        partyType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        partySubType: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        mobileWalletNumber: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      });
      setDynamicValidationSchema(validationSchema);
    }
    setPartySubType(value.code);
  };

  const handleParyNumberChange = (value: Option) => {
    setPartyNumber(value.code);
  };

  const agentCode = 'LMPEXAE00001';

  const createCustomer = (values: InitialValues, resetForm: any) => {
    window.scrollTo(0, 0);
    setLoading(true);
    setTimeout(() => {
      if (values.partySubType === 'individual') {
        const postData = {
          partyNo: Math.floor(100000000 + Math.random() * 900000000),
          partyType: values.partyType,
          partySubtype: values.partySubType,
          partyRelationNo: '',
          firstName: values.familyName,
          middleName: values.middleName,
          lastName: values.lastName,
          agentCode,
          primaryMobile: values.primaryMobile,
          secondaryMobile: values.secondaryMobile,
          primaryEmail: values.primaryEmail,
          secondaryEmail: values.secondaryEmail,
          amlStatus: 1,
          status: 1,
          createdBy: 'Kumar',
          updatedBy: 'Kumar',
          notifyByEmail: true,
          notifyBySms: true,
          placeOfBirth: values.placeOfBirth,
          countryOfBirth: values.countryOfBirth,
          occupation: values.occupation,
          familyName: values.familyName,
          gender: values.gender,
          proofOfFund: values.proofOfFund,
          dob: values.dob,
          country: values.country,
        };
        axios
          .post(partyApi, postData)
          .then((response) => {
            console.log(response);
            resetForm();
            setLoading(false);
            setAlertMessage('Party added successfully!');
            setOpen(true);
          })
          .catch((error) => {
            console.log(error.response);
            setLoading(false);
          });
      }
      if (values.partySubType === 'bankTransfer') {
        const postData = {
          partyNo: partyNumber,
          accountType: values.accountType,
          iban: values.iban,
          accountNumber: values.accountNumber,
          bankIdentificationCode: values.bankIdentificationCode,
          bankSubCode: values.bankSubCode,
          bankName: values.bankName,
          branchName: values.branchName,
          branchAddress: values.branchAddress,
          branchCity: values.branchCity,
          branchState: values.branchState,
          status: true,
          lmBankBranchCode: values.lmBankBranchCode,
          createdBy: 'Kumar',
          updatedBy: 'Kumar',
        };
        axios
          .post(bankTransfterAPIURL, postData)
          .then((response) => {
            console.log(response);
            resetForm();
            setLoading(false);
            setAlertMessage('Bank account added successfully!');
            setOpen(true);
          })
          .catch((error) => {
            console.log(error.response);
            setLoading(false);
          });
      }
      if (values.partySubType === 'mobileWallet') {
        const postData = {
          partyNo: partyNumber,
          mobileWalletNumber: values.mobileWalletNumber,
          status: true,
          createdBy: 'Kumar',
          updatedBy: 'Kumar',
        };
        axios
          .post(mobileWalletAPIURL, postData)
          .then((response) => {
            console.log(response);
            resetForm();
            setLoading(false);
            setAlertMessage('Mobile wallet added successfully!');
            setOpen(true);
            setPartySubType('');
          })
          .catch((error) => {
            console.log(error.response);
            setLoading(false);
          });
      }
    }, 400);
  };

  const addParty = (values: PartyIdInitialValues, resetForm: any) => {
    setLoading(true);
    setTimeout(() => {
      const postData = {
        idType: values.idType,
        customerNo: values.customerNo,
        issueDate: values.issueDate,
        expiryDate: values.expiryDate,
        idStatus: true,
        status: 'true',
        createdBy: 'Kumar',
        updatedBy: 'Kumar',
      };
      axios
        .post(partyIdAPIURL, postData)
        .then((response) => {
          console.log(response);
          resetForm();
          setLoading(false);
          setAlertMessage('Party Id added successfully!');
          setOpen(true);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
        });
    }, 400);
  };

  const addAddress = (values: PartyIAddressInitialValues, resetForm: any) => {
    setLoading(true);
    setTimeout(() => {
      const postData = {
        customerNo: values.customerNo,
        address1: values.address1,
        address2: values.address2,
        status: true,
        city: values.city,
        state: values.state,
        zipcode: values.zipcode,
        createdBy: 'Kumar',
        updatedBy: 'Kumar',
      };
      axios
        .post(partyAddressAPIURL, postData)
        .then((response) => {
          console.log(response);
          resetForm();
          setLoading(false);
          setAlertMessage('Party Address added successfully!');
          setOpen(true);
        })
        .catch((error) => {
          console.log(error.response);
          setLoading(false);
        });
    }, 400);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card className={style.mainCard}>
      {/* <CardHeader title={name} titleTypographyProps={{ variant: "h6" }} /> */}
      <CardContent>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        )}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {aletMessage}
          </Alert>
        </Snackbar>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <strong>Party</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              {...{ initialValues, validationSchema: dynamicValidationSchema }}
              enableReinitialize={true}
              onSubmit={(values, { resetForm }) => {
                createCustomer(values, resetForm);
              }}
            >
              {() => (
                <Form noValidate>
                  <Card className={style.mainCard}>
                    {/* <CardHeader className={style.py0} title="Party" titleTypographyProps={{ variant: 'h6' }} /> */}
                    <CardContent className={style.ml}>
                      <Grid container spacing={0.5}>
                        <Grid item xs={12} sm={4}>
                          <CustomSelect
                            label="Party Type"
                            name="partyType"
                            options={partyType}
                            handleOnChange={handlePartyChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomSelect
                            label="Party Sub Type"
                            name="partySubType"
                            options={parySubTypeOptions}
                            handleOnChange={handleParySubTypeChange}
                          />
                        </Grid>
                        {(partySubType === 'bankTransfer' ||
                          partySubType === 'cashPickup' ||
                          partySubType === 'mobileWallet') && (
                          <Grid item xs={12} sm={4}>
                            <CustomSelect
                              label="Customer Number"
                              name="partyNumber"
                              options={partyList}
                              handleOnChange={handleParyNumberChange}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                  {partySubType === 'individual' && (
                    <Card className={style.mainCard}>
                      <CardHeader className={style.py0} title="Demographic" titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent className={style.ml}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="First Name" name="firstName" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Middle Name" name="middleName" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Last Name" name="lastName" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomDatePicker
                              key="dob"
                              label="Date of birth"
                              name="dob"
                              placeholder="Date of birth"
                              type=""
                              format="YYYY-MM-DD"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomSelect label="Gender" name="gender" options={genderOptions} />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Family Name" name="familyName" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Primary Mobile" name="primaryMobile" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Secondary Mobile" name="secondaryMobile" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Primary Email" name="primaryEmail" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Secondary Email" name="secondaryEmail" type="text" />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}
                  {partySubType === 'individual' && (
                    <Card className={style.mainCard}>
                      <CardHeader className={style.py0} title="Address" titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent className={style.ml}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Place of birth" name="placeOfBirth" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomSelect label="Country Of Birth" name="countryOfBirth" options={countryList} />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomSelect label="Country" name="country" options={countryList} />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomSelect label="Occupation" name="occupation" options={occupationList} />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomSelect label="Proof Of Fund" name="proofOfFund" options={sourceOfIncomeList} />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}
                  {partySubType === 'bankTransfer' && (
                    <Card className={style.mainCard}>
                      <CardHeader
                        className={style.py0}
                        title="Account Deposit"
                        titleTypographyProps={{ variant: 'h6' }}
                      />
                      <CardContent className={style.ml}>
                        <Grid container spacing={0.5}>
                          <Grid item xs={12} sm={4}>
                            <CustomSelect label="Account Type" name="accountType" options={accountType} />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Iban" name="iban" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Account Number" name="accountNumber" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput
                              placeholder="Bank Identification Code"
                              name="bankIdentificationCode"
                              type="text"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Bank Sub Code" name="bankSubCode" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Bank Name" name="bankName" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Branch Name" name="branchName" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Branch Address" name="branchAddress" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Branch City" name="branchCity" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Branch State" name="branchState" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="LM Bank Branch Code" name="lmBankBranchCode" type="text" />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}
                  {partySubType === 'cashPickup' && (
                    <Card className={style.mainCard}>
                      <CardHeader className={style.py0} title="Cash Pickup" titleTypographyProps={{ variant: 'h6' }} />
                      <CardContent className={style.ml}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="City" name="cpCity" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="State" name="cpState" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="POBox" name="cpPostBox" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <CustomTextInput placeholder="Address 1" name="cpAddress1" type="text" />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <CustomTextInput placeholder="Address 2" name="cpAddress2" type="text" />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}
                  {partySubType === 'mobileWallet' && (
                    <Card className={style.mainCard}>
                      <CardHeader
                        className={style.py0}
                        title="Mobile Wallet"
                        titleTypographyProps={{ variant: 'h6' }}
                      />
                      <CardContent className={style.ml}>
                        <Grid container spacing={0.5}>
                          <Grid item xs={12} sm={4}>
                            <CustomTextInput placeholder="Mobile Wallet Number" name="mobileWalletNumber" type="text" />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )}

                  <br />
                  {partySubType !== '' && (
                    <Grid container spacing={3} textAlign="center" justifyContent="center">
                      <Grid item xs={3}>
                        <Button variant="contained" color="error" type="reset" fullWidth onClick={() => {}}>
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant="contained" type="submit" fullWidth>
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Form>
              )}
            </Formik>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <strong>Party Id</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              {...{ initialValues: partyIdInitialValues, partyIdValidationSchema }}
              onSubmit={(values, { resetForm }) => {
                addParty(values, resetForm);
              }}
            >
              {() => (
                <Form noValidate>
                  <Card className={style.mainCard}>
                    {/* <CardHeader className={style.py0} title="ID Details" titleTypographyProps={{ variant: 'h6' }} /> */}
                    <CardContent className={style.ml}>
                      <Grid container spacing={0.5}>
                        <Grid item xs={12} sm={4}>
                          <CustomSelect label="ID Type" name="idType" options={idProof} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextInput placeholder="Customer No" name="customerNo" type="number" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomDatePicker
                            key="issueDate"
                            label="Issue Date"
                            name="issueDate"
                            placeholder="Issue Date"
                            type=""
                            format="YYYY-MM-DD"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomDatePicker
                            key="expiryDate"
                            label="Expiry Date"
                            name="expiryDate"
                            placeholder="Expiry Date"
                            type=""
                            format="YYYY-MM-DD"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Grid container spacing={3} textAlign="center" justifyContent="center">
                    <Grid item xs={3}>
                      <Button variant="contained" color="error" type="reset" fullWidth onClick={() => {}}>
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
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <strong>Party Address</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Formik
              {...{ initialValues: partyIAddressInitialValues, partyAddressValidationSchema }}
              onSubmit={(values, { resetForm }) => {
                addAddress(values, resetForm);
              }}
            >
              {() => (
                <Form noValidate>
                  <Card className={style.mainCard}>
                    <CardContent className={style.ml}>
                      <Grid container spacing={0.5}>
                        <Grid item xs={12} sm={4}>
                          <CustomTextInput placeholder="Customer No" name="customerNo" type="number" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextInput placeholder="Address1" name="address1" type="text" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextInput placeholder="Address2" name="address2" type="text" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextInput placeholder="City" name="city" type="text" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextInput placeholder="State" name="state" type="text" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <CustomTextInput placeholder="Zip Code" name="zipcode" type="text" />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Grid container spacing={3} textAlign="center" justifyContent="center">
                    <Grid item xs={3}>
                      <Button variant="contained" color="error" type="reset" fullWidth onClick={() => {}}>
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
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};
