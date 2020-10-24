import PropTypes from 'prop-types';

export const BaseButtonPropTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const BaseButtonDefaultProps = {
  text: 'Button',
  color: '#000',
  backgroundColor: '#fff',
  disabled: false,
  onClick: () => {},
};
