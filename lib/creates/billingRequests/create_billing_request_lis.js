/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { createBillingRequest } = require('../../connect/api/billingRequests/create');
const sample = require('../../samples/billing_request');
const { BILLING_REQUEST_LIS_FIELDS } = require('../../fields/input/new_billing_request');

module.exports = {
  key: 'create_billing_request_lis',
  noun: 'Billing Request',
  display: {
    label: 'Create Billing Request (With Line Items Support)',
    description: 'Providers and Vendors can create a new Billing Request.',
  },
  operation: {
    inputFields: BILLING_REQUEST_LIS_FIELDS,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return createBillingRequest(client, bundle.authData.account_type, bundle.inputData);
    },
    sample,
  },
};
