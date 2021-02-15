/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { closeCaseRequest } = require('../../connect/api/caseRequests/actions');
const sample = require('../../samples/request');

module.exports = {
  key: 'close_case_request',
  noun: 'Close Case Request',
  display: {
    label: 'Set case to closed status',
    description: 'Allows the settings on the "Closed" status on a existing helpdesk case in CloudBlue Connect. '
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
      return closeCaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
