/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createCaseRequest } = require('../../connect/api/caseRequests/create');
const sample = require('../../samples/request');
const { CASE_FIELDS } = require('../../fields/input/new_case');

module.exports = {
  key: 'create_case',
  noun: 'Case Request',
  display: {
    label: 'Create a Helpdesk Case',
    description: 'Can create a helpdesk cases using this action, ',
  },
  operation: {
    inputFields: CASE_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createCaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
