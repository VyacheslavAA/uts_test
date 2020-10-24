import React from 'react';

import {
  BaseButtonPropTypes,
  BaseButtonDefaultProps
} from './BaseButtonPropTypes';
import { BaseButton } from './BaseButton';

export const OrangeButton = ({
  text,
  ...buttonProps
}) => (
  <BaseButton
    { ...buttonProps }
    text={text}
    color="#fff"
    backgroundColor="#c57a1f"
  />
);

OrangeButton.propTypes = BaseButtonPropTypes;
OrangeButton.defaultProps = BaseButtonDefaultProps;