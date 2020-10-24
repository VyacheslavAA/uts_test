import styled from 'styled-components';

import registrationFormBg from './../../assets/images/RegistrationForm/registration_form_bg.jpg';

export const RegistrationFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 15px;
  height: 100%;
  min-height: 100vh;
  background-image: url(${registrationFormBg});
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #2731a7b8;
    z-index: -1;
  }
`;

export const RegistrationFormInput = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 25px;
  margin-right: ${ props => props.marginRight || 0 };
  width: ${ props => props.width || '100%' };

  @media (max-width: 590px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 768px;

  @media (max-width: 590px) {
    flex-direction: column;
  }
`;

export const SendCodeButtonContainer = styled.div`
  width: 100%;
  max-width: 110px;
`;