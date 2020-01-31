/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */


const FIELDS_TIER_2 = [
  {
    key: 't2_external_id',
    label: 'Tier 2 External ID',
    required: true,
    helpText: 'Provide the ID of the Tier 2 on the external system that will help you identify the account on Connect platform. '
      + 'Please note that vendor also will see it for helping on support operations',
  },
  {
    key: 't2_external_uid',
    label: 'Tier 2 External UID',
    required: false,
    helpText: 'Provide if you have it a unique identifier in the form of a UUID for the tier on the commerce system, '
      + 'in case it\'s not provided a unique UUID will be auto-generated',
  },
  {
    key: 't2_company_name',
    label: 'Tier 2 Account Name',
    helpText: 'Specify the company or account name on the commerce system to be used for request creation.',
    required: true,
  },
  {
    key: 't2_address1',
    label: 'Tier 2 Address Line 1',
    required: true,
    helpText: 'Provide the postal address of the related account, '
      + 'please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  { key: 't2_address2', label: 'Tier 2 Address Line 2', required: false },
  {
    key: 't2_postal_code',
    label: 'Tier 2 Postal Code',
    required: true,
    helpText: 'Provide the postal code of the related account, please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  {
    key: 't2_city',
    label: 'Tier 2 City',
    required: true,
    helpText: 'Please specify the City name of the related account, please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  { key: 't2_state', label: 'Tier 2 State or Province', required: true },
  {
    key: 't2_country',
    label: 'Tier 2 Country',
    required: true,
    helpText: 'Provide the country of the related account, please use Alpha-2 code.',
  },
  {
    key: 't2_first_name',
    label: 'Tier 2 Contact First Name',
    required: true,
    helpText: 'Provide the contact name of the technical contact related with the account.',
  },
  {
    key: 't2_last_name',
    label: 'Tier 2 Contact Last Name',
    required: true,
    helpText: 'Provide the last name or family name of the technical contact related with the account.',
  },
  {
    key: 't2_email',
    label: 'Tier 2 Email',
    required: true,
    helpText: 'Provide the email address of the technical contact related with the account, this one typically '
      + 'is a requirement by vendors to process the request, additionally please note that this email will be '
      + 'used to send inquire requests related with the fulfillment of the request.',
  },
  {
    key: 't2_phone',
    label: 'Tier 2 Phone Number',
    required: true,
    helpText: 'provide the phone number of the technical contact. We suggest to use international phone notation '
      + 'in order to ensure the correctness of the phone number.',
  },
];

const FIELDS_TIER_1 = [
  {
    key: 't1_external_id',
    label: 'Tier 1 External ID',
    required: true,
    helpText: 'Provide the ID of the Tier 1 on the external system that will help you identify the account on Connect platform. '
      + 'Please note that vendor also will see it for helping on support operations',
  },
  {
    key: 't1_external_uid',
    label: 'Tier 1 External UID',
    required: false,
    helpText: 'Provide if you have it a unique identifier in the form of a UUID for the tier on the commerce system, '
      + 'in case it\'s not provided a unique UUID will be auto-generated',
  },
  {
    key: 't1_company_name',
    label: 'Tier 1 Account Name',
    helpText: 'Specify the company or account name on the commerce system to be used for request creation.',
    required: true,
  },
  {
    key: 't1_address1',
    label: 'Tier 1 Address Line 1',
    required: true,
    helpText: 'Provide the postal address of the related account, '
      + 'please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  { key: 't1_address2', label: 'Tier 1 Address Line 2', required: false },
  {
    key: 't1_postal_code',
    label: 'Tier 1 Postal Code',
    required: true,
    helpText: 'Provide the postal code of the related account, please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  {
    key: 't1_city',
    label: 'Tier 1 City',
    required: true,
    helpText: 'Please specify the City name of the related account, please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  { key: 't1_state', label: 'Tier 1 State or Province', required: true },
  {
    key: 't1_country',
    label: 'Tier 1 Country',
    required: true,
    helpText: 'Provide the country of the related account, please use Alpha-2 code.',
  },
  {
    key: 't1_first_name',
    label: 'Tier 1 Contact First Name',
    required: true,
    helpText: 'Provide the contact name of the technical contact related with the account.',
  },
  {
    key: 't1_last_name',
    label: 'Tier 1 Contact Last Name',
    required: true,
    helpText: 'Provide the last name or family name of the technical contact related with the account.',
  },
  {
    key: 't1_email',
    label: 'Tier 1 Email',
    required: true,
    helpText: 'Provide the email address of the technical contact related with the account, this one typically '
      + 'is a requirement by vendors to process the request, additionally please note that this email will be '
      + 'used to send inquire requests related with the fulfillment of the request.',
  },
  {
    key: 't1_phone',
    label: 'Tier 1 Phone Number',
    required: true,
    helpText: 'provide the phone number of the technical contact. We suggest to use international phone notation '
      + 'in order to ensure the correctness of the phone number.',
  },
];

const FIELDS_CUSTOMER = [
  {
    key: 'customer_external_id',
    label: 'Customer External ID',
    required: true,
    helpText: 'Provide the ID of the Customer on the external system that will help you identify the account on Connect platform. '
      + 'Please note that vendor also will see it for helping on support operations',
  },
  {
    key: 'customer_external_uid',
    label: 'Customer External UID',
    required: false,
    helpText: 'Provide if you have it a unique identifier in the form of a UUID for the tier on the commerce system, '
      + 'in case it\'s not provided a unique UUID will be auto-generated',
  },
  {
    key: 'customer_company_name',
    label: 'Customer Account Name',
    helpText: 'Specify the company or account name on the commerce system to be used for request creation.',
    required: true,
  },
  {
    key: 'customer_address1',
    label: 'Customer Address Line 1',
    required: true,
    helpText: 'Provide the postal address of the related account, '
      + 'please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  { key: 'customer_address2', label: 'Customer Address Line 2', required: false },
  {
    key: 'customer_postal_code',
    label: 'Customer Postal Code',
    required: true,
    helpText: 'Provide the postal code of the related account, please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  {
    key: 'customer_city',
    label: 'Customer City',
    required: true,
    helpText: 'Please specify the City name of the related account, please note that are not validated by CloudBlue Connect but vendor may do it.',
  },
  { key: 'customer_state', label: 'Customer State or Province', required: true },
  {
    key: 'customer_country',
    label: 'Customer Country',
    required: true,
    helpText: 'Provide the country of the related account, please use Alpha-2 code.',
  },
  {
    key: 'customer_first_name',
    label: 'Customer Contact First Name',
    required: true,
    helpText: 'Provide the contact name of the technical contact related with the account.',
  },
  {
    key: 'customer_last_name',
    label: 'Customer Contact Last Name',
    required: true,
    helpText: 'Provide the last name or family name of the technical contact related with the account.',
  },
  {
    key: 'customer_email',
    label: 'Customer Email',
    required: true,
    helpText: 'Provide the email address of the technical contact related with the account, this one typically '
      + 'is a requirement by vendors to process the request, additionally please note that this email will be '
      + 'used to send inquire requests related with the fulfillment of the request.',
  },
  {
    key: 'customer_phone',
    label: 'Customer Phone Number',
    required: true,
    helpText: 'provide the phone number of the technical contact. We suggest to use international phone notation '
      + 'in order to ensure the correctness of the phone number.',
  },
];


module.exports = {
  FIELDS_CUSTOMER,
  FIELDS_TIER_1,
  FIELDS_TIER_2,
};
