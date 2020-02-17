/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const parsePhoneNumber = (number, country) => {
  try {
    let parsed;
    try {
      parsed = phoneUtil.parseAndKeepRawInput(number);
    } catch (e) {
      parsed = phoneUtil.parseAndKeepRawInput(number, country);
    }
    const countryCode = `+${parsed.getCountryCode()}`;
    const nationalSignificantNumber = phoneUtil.getNationalSignificantNumber(parsed);
    let areaCode = '';
    let subscriberNumber = nationalSignificantNumber;
    const areaCodeLength = phoneUtil.getLengthOfGeographicalAreaCode(parsed);
    if (areaCodeLength > 0) {
      areaCode = nationalSignificantNumber.substr(0, areaCodeLength);
      subscriberNumber = nationalSignificantNumber.substr(areaCodeLength);
    }
    return {
      country_code: countryCode,
      area_code: areaCode,
      phone_number: subscriberNumber,
      extension: parsed.getExtension() || '',
    };
  } catch (e) {
    return {};
  }
};

module.exports = { parsePhoneNumber };
