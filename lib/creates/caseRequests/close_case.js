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
    label: 'Set Case to Closed Status',
    description: 'Allows the settings on the "Closed" status on a existing helpdesk case in CloudBlue Connect. '
      + 'The case identifier can be passed from previous steps of the Zap.',
  },
  operation: {
    inputFields: [{
      key: 'case_id',
      label: 'Case ID',
      required: true,
    },
    {
      key: 'feedback',
      label: 'Feedback of the resolution',
      required: false,
      helpText: 'Provide the feedback of the resolution of the case.',
    },
    {
      key: 'rating',
      label: 'Rating of the resolution of the case',
      helpText: 'Provide a valoration of the resolution of the case',
      type: 'string',
      choices: {
        1: 'Poor',
        2: 'Well',
        3: 'Average',
        4: 'Good',
        5: 'Excellent',
      },
      required: false,
      default: '3',
    }],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return closeCaseRequest(client, bundle.inputData);
    },
    sample,
  },
};
