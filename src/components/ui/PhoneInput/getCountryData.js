import _rawCountries from './rawCountries'

function getMask(prefix, dialCode, predefinedMask, defaultMask) {
  if (!predefinedMask) {
    return prefix+''.padEnd(dialCode.length,'.')+' '+defaultMask;
  } else {
    return prefix+''.padEnd(dialCode.length,'.')+' '+predefinedMask;
  }
}

function initCountries(countries, prefix, defaultMask) {
  const initializedCountries = [].concat(...countries.map((country) => {
    const countryItem = {
      name: country[0],
      regions: country[1],
      iso2: country[2],
      countryCode: country[3],
      dialCode: country[3],
      format: getMask(prefix, country[3], country[4], defaultMask),
    };

    const areaItems = [];

    country[6] &&
      country[6].forEach((areaCode) => {
        const areaItem = {...countryItem};
        areaItem.dialCode = country[3] + areaCode;
        areaItem.isAreaCode = true;
        areaItem.areaCodeLength = areaCode.length;

        areaItems.push(areaItem);
      });

    if (areaItems.length > 0) {
      countryItem.mainCode = true;
      return [countryItem];
    } else {
      return [countryItem];
    }
  }));

  return initializedCountries;
}

export default (prefix, defaultMask) => {
  const rawCountries = JSON.parse(JSON.stringify(_rawCountries));
  let initializedCountries = initCountries(rawCountries, prefix, defaultMask);

  return {
    onlyCountries: initializedCountries,
  }
};
