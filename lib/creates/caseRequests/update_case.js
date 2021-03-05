/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { updateCaseRequest } = require('../../connect/api/caseRequests/create');
const sample = require('../../samples/request');
const { CASE_FIELDS } = require('../../fields/input/update_case');

module.exports = {
  key: 'update_case',
  noun: 'Update Case Request',
  display: {
    label: 'Update a Helpdesk Case',
    description: 'Can update helpdesk cases using this action, ',
  },
  operation: {
    inputFields: CASE_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return updateCaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
