import PropsTypes from 'prop-types';

export const BaseInputPropTypes = {
  error: PropsTypes.string,
  label: PropsTypes.string,
  value: PropsTypes.any,
  placeholder: PropsTypes.string,
  name: PropsTypes.string,
  type: PropsTypes.string,
  onBlur: PropsTypes.func,
  onChange: PropsTypes.func,
};

export const BaseInputDefaultProps = {
  type: 'text',
  value: '',
  onBlur: () => {},
  onChange: () => {},
};
