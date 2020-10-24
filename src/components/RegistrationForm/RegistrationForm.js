import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDebounce } from './../../hooks';
import {
  BaseInput,
  BaseButton,
  OrangeButton,
  PhoneInput
} from './../ui'
import {
  Form,
  RegistrationFormContainer,
  RegistrationFormInput,
  SendCodeButtonContainer
} from './RegistrationForm.style';

const RegistrationForm = () => {
  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Only letters are allowed')
      .required('First name is required'),
    lastName: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Only letters are allowed')
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required'),
    smsCode: Yup.number()
      .required('Required'),
    password: Yup.string()
      .required('Password is required'),
    confirmPassword: Yup.string()
     .oneOf([ Yup.ref('password'), null ], 'Passwords must match')
     .required('Confirm password is required'),
  });
  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      smsCode: '',
      password: '',
      confirmPassword: ''
    },
    validateOnMount: false,
    validationSchema: RegistrationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const onPhoneNumberChange = (phoneNumber, opts) => {
    const regexToValidatePhone = new RegExp(
      opts.format.replace('+', '\\+')
    );

    if (!regexToValidatePhone.test(phoneNumber)) {
      formik.setFieldError('phoneNumber', 'Phone number isn\'t correct');
    } else {
      formik.setFieldError('phoneNumber');
    }

    formik.setFieldValue('phoneNumber', phoneNumber, false);
  };

  return (
    <RegistrationFormContainer>
      <Form>
        <RegistrationFormInput
          width="calc(50% - 5px)"
          marginRight="10px"
        >
          <BaseInput
            label="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName ? formik.errors.firstName : undefined}
          />
        </RegistrationFormInput>

        <RegistrationFormInput width="calc(50% - 5px)">
          <BaseInput
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName ? formik.errors.lastName : undefined}
          />
        </RegistrationFormInput>

        <RegistrationFormInput>
          <BaseInput
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email : undefined}
          />
        </RegistrationFormInput>

        <RegistrationFormInput
          width="calc(50% - 5px)"
          marginRight="10px"
        >
          <PhoneInput
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={onPhoneNumberChange}
            onBlur={() => formik.setFieldTouched('phoneNumber', true, false)}
            error={formik.touched.phoneNumber ? formik.errors.phoneNumber : undefined}
          />
        </RegistrationFormInput>

        <RegistrationFormInput width="calc(50% - 5px)">
          <BaseInput
            label="SMS code"
            type="number"
            name="smsCode"
            value={formik.values.smsCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.smsCode ? formik.errors.smsCode : undefined}
          />

          <SendCodeButton disabled={!!formik.errors.phoneNumber || !formik.values.phoneNumber}/>
        </RegistrationFormInput>

        <RegistrationFormInput
          width="calc(50% - 5px)"
          marginRight="10px"
        >
          <BaseInput
            label="Password (min 8 symbols)"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password ? formik.errors.password : undefined}
          />
        </RegistrationFormInput>

        <RegistrationFormInput width="calc(50% - 5px)">
          <BaseInput
            label="Retype Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
          />
        </RegistrationFormInput>

        <OrangeButton
          disabled={!formik.isValid}
          text="open account"
          onClick={formik.handleSubmit}
        />
      </Form>
    </RegistrationFormContainer>
  );
}
 
export default RegistrationForm;

const SendCodeButton = ({
  disabled
}) => {
  const onSendCodeClick = () => console.log('Send code.');

  const {
    callback,
    isReadyToUse,
    timerValue
  } = useDebounce(onSendCodeClick, 30);

  return (
    <SendCodeButtonContainer>
      <BaseButton
        disabled={disabled}
        onClick={callback}
        text={ isReadyToUse ? "send code" : timerValue.toString() }
      />
    </SendCodeButtonContainer>
  );
};