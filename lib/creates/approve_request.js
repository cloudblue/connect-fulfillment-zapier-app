/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');

const { getConnectClient } = require('../connect/http');
const sample = require('../samples/request');

const approveRequest = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.approveRequestWithTemplate(
    bundle.inputData.id,
    bundle.inputData.template_id,
  );
  return Promise.resolve(response);
};


module.exports = {
  key: 'approve_request',
  noun: 'Asset Request',
  display: {
    label: 'Approve Asset Request',
    description: 'Vendors can use this action to approve a concrete request that is in status pending.',
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
        key: 'template_id',
        label: 'Template ID',
        required: true,
        helpText: 'Specify the template ID used by the given product the request relates with. The list of available '
          + 'templates can be obtained on Connect Portal under concrete product on the Control panel section.',
      },
    ],
    perform: approveRequest,
    sample,
  },
};
