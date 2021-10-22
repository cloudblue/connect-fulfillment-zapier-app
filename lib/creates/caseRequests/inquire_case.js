/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { inquireCaseRequest } = require('../../connect/api/caseRequests/actions');
const sample = require('../../samples/request');

module.exports = {
  key: 'inquire_case_request',
  noun: 'Inquire Case Request',
  display: {
    label: 'Set Case to Inquire Status',
    description: 'Allows the settings on the "Inquire" status on a existing helpdesk case in CloudBlue Connect. '
      + 'The asset identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: [{
      key: 'case_id',
      label: 'Case ID',
      required: true,
    },
    {
      key: 'message',
      label: 'Inquire message',
      required: false,
      helpText: 'Provide the message for the inquire.',
    }],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return inquireCaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
