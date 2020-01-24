/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const _ = require('lodash');
const sample = require('../samples/request');
const inputFields = require('../fields/input/search_requests');
const outputFields = require('../fields/output/request');

const { listRequests } = require('../connect/api/requests');


const swapId = async (z, bundle) => {
  const results = await listRequests(z, bundle, null);
  _.forEach(results, (value) => {
    /* eslint-disable no-param-reassign */
    value.request_id = value.id;
    value.id = z.hash('sha1', value.id + value.updated);
  });
  return Promise.resolve(results);
};

module.exports = {
  key: 'new_updated_requests',
  noun: 'Request',

  display: {
    label: 'New or updated Asset Request',
    description: 'Triggers when a fulfillment request is created or gets updated on the fulfillment queue using polling to CloudBlue Connect.',
  },

  operation: {
    inputFields,
    perform: swapId,
    sample,
    outputFields,
  },
};
