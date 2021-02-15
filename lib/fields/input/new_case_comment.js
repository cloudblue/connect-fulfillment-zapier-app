/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const CASE_COMMENT_FIELDS = [
  {
    key: 'case_id',
    label: 'Case ID',
    required: true,
    helpText: 'Provide the ID of the case for the comment it\'s created.',
  },
  {
    key: 'text',
    label: 'Text of the comment',
    required: false,
    helpText: 'Provide the description of the comment.',
  },
];

module.exports = {
  CASE_COMMENT_FIELDS,
};
