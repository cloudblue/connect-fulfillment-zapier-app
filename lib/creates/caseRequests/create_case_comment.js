/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createCommentByCaseId } = require('../../connect/api/caseRequests/create');
const sample = require('../../samples/request');
const { CASE_COMMENT_FIELDS } = require('../../fields/input/new_case_comment');

module.exports = {
  key: 'create_case_comment',
  noun: 'Case Comment Request',
  display: {
    label: 'Create a Helpdesk Case Comment',
    description: 'Can create helpdesk case comments using this action, ',
  },
  operation: {
    inputFields: CASE_COMMENT_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createCommentByCaseId(client, bundle.inputData);
    },
    sample,
  },
};
