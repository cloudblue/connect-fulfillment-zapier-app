/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const sample = require('../samples/request');
const inputFields = require('../fields/input/search_requests');
const outputFields = require('../fields/output/request');

const { listRequests } = require('../connect/api/requests');

module.exports = {
  key: 'new_requests',
  noun: 'New requests',

  display: {
    label: 'New Request',
    description: 'Triggers when a new Request is created.',
  },

  operation: {
    inputFields,
    perform: listRequests,

    sample,
    outputFields,
  },
};
