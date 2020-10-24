import styled from 'styled-components';

export const BaseInputContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  color: #fff;
  font-size: 18px;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  border: none;
  padding: 10px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.8);
`;

export const ErrorMessage = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(100%);
  color: #ff6262;
`;

