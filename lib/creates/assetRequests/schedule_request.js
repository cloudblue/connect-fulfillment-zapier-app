/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 *  @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { scheduleRequest } = require('../../connect/api/assetRequests/actions');
const sample = require('../../samples/request');

module.exports = {
  key: 'schedule_request',
  noun: 'Schedule Request',
  display: {
    label: 'Schedule Asset Request',
    description: 'Vendors can use this action to schedule a concrete request that is in status pending.',
  },
  operation: {
    inputFields: [
      {
        key: 'id',
        label: 'Request ID',
        required: true,
        helpText: 'Specify the request ID to update, this one can come from previous steps of the Zap or from a Search.',
      },
      {
        key: 'planned_date',
        label: 'Planned Date',
        type: 'datetime',
        required: false,
        helpText: 'As an ISO 8601 timestamp (Ex. 2020-01-01T14:00:00+01:00).',
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return scheduleRequest(client, bundle.inputData);
    },
    sample,
  },
};
