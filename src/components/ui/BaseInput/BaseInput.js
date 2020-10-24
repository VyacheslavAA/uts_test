import React from 'react';

import {
  BaseInputDefaultProps,
  BaseInputPropTypes
} from './BaseInputPropTypes';

import {
  Label,
  BaseInputContainer,
  Input,
  ErrorMessage
} from './BaseInput.style';

export const BaseInput = ({
  error,
  label,
  value,
  placeholder,
  name,
  type,
  onBlur,
  onChange,
}) => {
  return (
    <BaseInputContainer>
      {
        label && <Label htmlFor={name}>{label}</Label>
      }
        <Input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          value={value}
          error={!!error}
        />
      {
        error && <ErrorMessage>{error}</ErrorMessage>
      }
    </BaseInputContainer>
  );
};

BaseInput.propTypes = BaseInputPropTypes;
BaseInput.defaultProps = BaseInputDefaultProps;