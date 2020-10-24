import React, { useState, useEffect } from 'react';
import reduce from 'lodash.reduce';
import startsWith from 'lodash.startswith';

import getCountryData from './getCountryData';
import { BaseInput } from './../BaseInput';
import {
  PhoneInputDefaultProps,
  PhoneInputPropTypes
} from './PhoneInputPropTypes';
import {
  PhoneInputContainer,
  Flag
} from './PhoneInput.style';

const prefix = '+';
const defaultMask = '... ... ... ..';
const { onlyCountries } = getCountryData(prefix, defaultMask);

export const PhoneInput = ({
  onChange,
  onBlur,
  error,
  name,
  label
}) => {
  const [formattedNumber, setFormattedNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const guessSelectedCountry = (inputNumber, onlyCountries) => {
    let mainCode;

    if (mainCode) return mainCode;

    const bestGuess = onlyCountries.reduce((selectedCountry, country) => {
      if (startsWith(inputNumber, country.dialCode)) {
        return country;
      }
      return selectedCountry;
    }, {dialCode: ''});

    return bestGuess;
  };

  const formatNumber = (text, country) => {
    if (!country) return text;

    const { format } = country;
    const pattern = format;

    if (!text || text.length === 0) {
      return prefix;
    }

    // for all strings with length less than 3, just return it (1, 2 etc.)
    // also return the same text if the selected country has no fixed format
    if ((text && text.length < 2) || !pattern) {
      return prefix+text;
    }

    const formattedObject = reduce(pattern, (acc, character) => {
      if (acc.remainingText.length === 0) {
        return acc;
      }

      if (character !== '.') {
        return {
          formattedText: acc.formattedText + character,
          remainingText: acc.remainingText
        };
      }

      const [ head, ...tail ] = acc.remainingText;

      return {
        formattedText: acc.formattedText + head,
        remainingText: tail
      };
    }, {
      formattedText: '',
      remainingText: text.split('')
    });

    let formattedNumber = formattedObject.formattedText;

    // Always close brackets
    if (formattedNumber.includes('(') && !formattedNumber.includes(')')) formattedNumber += ')';
    return formattedNumber;
  }

  const handleInput = (evt) => {
    const { value } = evt.target;

    // ie hack
    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      evt.returnValue = false;
    }

    let newFormattedNumber = prefix;
    let newSelectedCountry = selectedCountry;

    if (value === prefix) {
      if (onChange) onChange('', selectedCountry);

      return setFormattedNumber('');
    }

    // ensure if quantity of digits exceeded
    if (newSelectedCountry && (value.replace(/\D/g, '').length > newSelectedCountry.format.replace(/[^.]/g, '').length)) return;

    // if the input is the same as before, must be some special key like enter etc.
    if (value.replace(/\D/g, '') === formattedNumber.replace(/\D/g, '')) return;

    if (value.length > 0) {
      // before entering the number in new format, lets check if the dial code now matches some other country
      const inputNumber = value.replace(/\D/g, '');

      // we don't need to send the whole number to guess the country... only the first 6 characters are enough
      // the guess country function can then use memoization much more effectively since the set of input it
      // gets has drastically reduced
      newSelectedCountry = guessSelectedCountry(inputNumber.substring(0, 6), onlyCountries) || selectedCountry;

      newFormattedNumber = formatNumber(inputNumber, newSelectedCountry);
      newSelectedCountry = newSelectedCountry.dialCode ? newSelectedCountry : selectedCountry;
    }

    setSelectedCountry(newSelectedCountry);
    setFormattedNumber(newFormattedNumber);
  }

  useEffect(() => {
    if (selectedCountry) {
      onChange(formattedNumber, selectedCountry);
    }
  }, [formattedNumber, selectedCountry]);

  const inputFlagClasses = `${selectedCountry && selectedCountry.iso2}`;

  return (
    <PhoneInputContainer className='react-tel-input'>
      <Flag className={inputFlagClasses} />

      <BaseInput
        label={label}
        onChange={handleInput}
        onBlur={onBlur}
        value={formattedNumber}
        type='tel'
        error={error}
        name={name}
      />
    </PhoneInputContainer>
  );
};

PhoneInput.proopTypes = PhoneInputPropTypes;
PhoneInput.defaultProps = PhoneInputDefaultProps;