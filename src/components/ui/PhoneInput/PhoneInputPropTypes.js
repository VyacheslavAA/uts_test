import PropTypes from 'prop-types';

export const PhoneInputPropTypes = {
  error: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export const PhoneInputDefaultProps = {
  label: "Phone Number",
  onChange: () => {},
  onBlur: () => {},
};
