import React from 'react';

import {
  BaseButtonDefaultProps,
  BaseButtonPropTypes
} from './BaseButtonPropTypes'

import { Button } from './BaseButton.style';

export const BaseButton = ({
  text,
  onClick,
  disabled,
  ...styles
}) => (
  <Button
    onClick={onClick}
    type="button"
    disabled={disabled}
    { ...styles }
  >
    {text}
  </Button>
);

BaseButton.propTypes = BaseButtonPropTypes;
BaseButton.defaultProps = BaseButtonDefaultProps;