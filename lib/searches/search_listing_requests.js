/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const sample = require('../samples/listing_request');
const inputFields = require('../fields/input/search_listing_request');
const outputFields = require('../fields/output/listing_request');

const { searchListingRequests } = require('../connect/api/listingRequests/actions');
const { getConnectClient } = require('../connect/http');


module.exports = {
  key: 'search_listing_request',
  noun: 'Listing Request',
  display: {
    label: 'Search a Listing Request',
    description: 'Search for Listing Requests.',
  },
  operation: {
    inputFields,
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return searchListingRequests(client, bundle.inputData);
    },
    sample,
    outputFields,
  },
};
