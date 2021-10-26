/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const CASE_FIELDS = [
  {
    key: 'case_id',
    label: 'Caset ID',
    required: true,
    helpText: 'Provide the ID of the ticket that will be modified.',
  },
  {
    key: 'product_id',
    label: 'Product ID',
    required: true,
    helpText: 'Provide the ID of the product for the ticket..',
  },
  {
    key: 'subject',
    label: 'Subject',
    required: false,
    helpText: 'Provide the subject of the case.',
  },
  {
    key: 'description',
    label: 'Description of the case',
    required: false,
    helpText: 'Provide the description of the case.',
  },
  {
    key: 'issuer_account',
    label: 'Issuer Account',
    required: false,
    helpText: 'Provide the Issuer Account ID.',
  },
  {
    key: 'issuer_actor',
    label: 'Issuer Actor',
    required: false,
    helpText: 'Provide the Issuer Actor ID.',
  },
  {
    key: 'issuer_recipients',
    children: [
      {
        key: 'id',
        label: 'Recipient ID',
        required: false,
        helpText: 'The value of this field should be in form UR-XXX-XXX-XXX and can be seen in Connect portal in '
          + 'the user details.',
      },
    ],
  },
  {
    key: 'receiver_account',
    label: 'Receiver Account',
    required: false,
    helpText: 'Provide the Receiver Account ID.',
  },
  {
    key: 'receiver_actor',
    label: 'Receiver Actor',
    required: false,
    helpText: 'Provide the Receiver Actor ID.',
  },
  {
    key: 'receiver_recipient',
    children: [
      {
        key: 'receiver_recipient_id',
        label: 'Recipient ID',
        required: true,
        helpText: 'The value of this field should be in form UR-XXX-XXX-XXX and can be seen in Connect portal in '
          + 'the user details.',
      },
    ],
  },
];

module.exports = {
  CASE_FIELDS,
};
