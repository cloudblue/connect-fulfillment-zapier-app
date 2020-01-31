/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

const { getConnectClient } = require('../connect/http');
const sample = require('../samples/tier_config_request');

const approveRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.approveTierConfigRequestWithTemplate(
    bundle.inputData.id,
    bundle.inputData.template_id,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'approve_tier_config_request',
  noun: 'Tier Configuration Request',
  display: {
    label: 'Approve Tier Configuration Request',
    description: 'Vendors can use this action to approve pending Tier Configuration Requests.',
  },
  operation: {
    inputFields: [
      { key: 'id', label: 'Request ID', required: true },
      { key: 'template_id', label: 'Template ID', required: true },
    ],
    perform: approveRequest,
    sample,
  },
};
