/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */


const { parsePhoneNumber } = require('../../../../lib/connect/api/helpers/phonenumbers');

describe('helpers.phonenumbers', () => {
  const withCountryCodeItalianFixed = '+390817434329';
  const withoutCountryCodeItalianFixed = '0817434329';
  const italianFixedExpected = {
    country_code: '+39',
    area_code: '081',
    phone_number: '7434329',
    extension: '',
  };

  const withCountryCodeSpanishFixed = '+34931221414';
  const withoutCountryCodeSpanishFixed = '931221414';
  const spanishFixedExpected = {
    country_code: '+34',
    area_code: '',
    phone_number: '931221414',
    extension: '',
  };

  const withCountryCodeMobile = '+34687787105';
  const withoutCountryCodeMobile = '687787105';
  const mobileExpected = {
    country_code: '+34',
    area_code: '',
    phone_number: '687787105',
    extension: '',
  };
  const withExtension = '+1 646 558 8656 ext. 3322';
  const withExtensionExpected = {
    country_code: '+1',
    area_code: '646',
    phone_number: '5588656',
    extension: '3322',
  };  

  it.each([
    ['with country code italian fixed', withCountryCodeItalianFixed, italianFixedExpected, ''],
    ['without country code italian fixed', withoutCountryCodeItalianFixed, italianFixedExpected, 'IT'],
    ['without country code italian fixed (invalid country)', withoutCountryCodeItalianFixed, {}, 'ZZ'],
    ['with country code spanish fixed', withCountryCodeSpanishFixed, spanishFixedExpected, ''],
    ['without country code spanish fixed', withoutCountryCodeSpanishFixed, spanishFixedExpected, 'ES'],
    ['with country code mobile', withCountryCodeMobile, mobileExpected, ''],
    ['without country code mobile', withoutCountryCodeMobile, mobileExpected, 'ES'],
    ['wit extension', withExtension, withExtensionExpected, ''],
  ])('parsePhoneNumber %s', (testcase, data, expected, country) => {
    expect(parsePhoneNumber(data, country)).toEqual(expected);
  });
});