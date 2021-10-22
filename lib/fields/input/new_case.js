/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const CASE_FIELDS = [
  {
    key: 'product_id',
    label: 'Product ID',
    required: true,
    helpText: 'Provide the ID of the product for the ticket it\'s created.',
  },
  {
    key: 'subject',
    label: 'Subject',
    required: true,
    helpText: 'Provide the subject of the case.',
  },
  {
    key: 'description',
    label: 'Description of the case',
    required: false,
    helpText: 'Provide the description of the case.',
  },
  {
    key: 'priority',
    label: 'Priority of the case',
    helpText: 'Define the priority of the case, the values are: 0 => Low, 1 => Medium, 2 => High, 3 => Urgent',
    type: 'string',
    choices: {
      0: 'Low',
      1: 'Medium',
      2: 'High',
      3: 'Urgent',
    },
    required: true,
    default: '0',
  },
  {
    key: 'type',
    label: 'Type of the case',
    helpText: 'Define the type of the case, the values are: Technical or Business',
    type: 'string',
    choices: {
      technical: 'Technical',
      business: 'Business',
    },
    required: true,
  },
  {
    key: 'account_id',
    label: 'Receiver account ID',
    type: 'string',
    required: true,
    helpText: 'The value of this field should be in form PA-XXX-XXX-XXX',
  },
  {
    key: 'issuer_recipients',
    children: [
      {
        key: 'id',
        label: 'Recipient ID',
        required: true,
        helpText: 'The value of this field should be in form UR-XXX-XXX-XXX and can be seen in Connect portal in '
          + 'the user details.',
      },
    ],
  },
];

const ACTION_CASE_FIELDS = [
  { key: 'case_id', label: 'Case ID', required: true },
];

module.exports = {
  CASE_FIELDS,
  ACTION_CASE_FIELDS,
};
