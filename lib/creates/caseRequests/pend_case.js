/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { pendCaseRequest } = require('../../connect/api/caseRequests/actions');
const sample = require('../../samples/request');

module.exports = {
  key: 'pend_case_request',
  noun: 'Pending Case Request',
  display: {
    label: 'Set case to pending status',
    description: 'Allows the settings on the "Pending" status on a existing helpdesk case in CloudBlue Connect. '
      + 'The case identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: [{
      key: 'case_id',
      label: 'Case ID',
      required: true,
    },
    {
      key: 'message',
      label: 'Pending message',
      required: false,
      helpText: 'Provide the message for the change the status to pening.',
    }],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return pendCaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
