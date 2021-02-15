/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { resolveCaseRequest } = require('../../connect/api/caseRequests/actions');
const sample = require('../../samples/request');

module.exports = {
  key: 'resolve_case_request',
  noun: 'Resolve Case Request',
  display: {
    label: 'Set case to resolved status',
    description: 'Allows the settings on the "Resolved" status on a existing helpdesk case in CloudBlue Connect. '
      + 'The case identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: [{
      key: 'case_id',
      label: 'Case ID',
      required: true,
    }],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return resolveCaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
