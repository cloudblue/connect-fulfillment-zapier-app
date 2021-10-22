/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../connect/http');
const { listRequests } = require('../connect/api/billingRequests/actions');

const sample = require('../samples/billing_request');
const inputFields = require('../fields/input/search_billing_requests');
const outputFields = require('../fields/output/billing_request');


module.exports = {
  key: 'search_billing_requests',
  noun: 'Billing Request',
  display: {
    label: 'Search a Billing Request',
    description: 'Search for Billing Requests.',
  },

  operation: {
    inputFields,
    perform: (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return listRequests(client, bundle.inputData, '-events.created.at');
    },
    sample,
    outputFields,
  },
};
