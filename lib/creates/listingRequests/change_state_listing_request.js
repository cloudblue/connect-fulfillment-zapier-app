/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { changeListingRequestStatus } = require('../../connect/api/listingRequests/actions');
const sample = require('../../samples/listing_request');


module.exports = {
  key: 'change_state_listing_request',
  noun: 'Listing Request',
  display: {
    label: 'Change Status of Listing Request',
    description: 'Vendors and Distributors can use this action to change status Listing Requests.',
  },
  operation: {
    inputFields: [
      { key: 'id', label: 'Request ID', required: true },
      {
        key: 'action',
        label: 'Action',
        required: true,
        choices: {
          complete: 'Complete',
          cancel: 'Cancel',
          refine: 'Refine',
          deploy: 'Deploy',
        },
      },
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return changeListingRequestStatus(client, bundle.inputData);
    },
    sample,
  },
};
