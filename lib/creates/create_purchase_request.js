/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { createPurchaseRequest } = require('../connect/api/requests');
const sample = require('../samples/request');
const inputFields = require('../fields/input/new_purchase_request');

module.exports = {
  key: 'create_purchase_request',
  noun: 'Purchase Request',
  display: {
    label: 'Create Purchase Request',
    description: 'Create a new Purchase Request.',
  },
  operation: {
    inputFields,
    perform: createPurchaseRequest,
    sample,
  },
};
