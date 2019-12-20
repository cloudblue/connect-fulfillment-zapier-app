/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');

/* eslint-disable no-unused-vars */
const addTaskIdToHeader = (request, z, bundle) => {
  request.headers['x-zapier-fulfillment-stepid'] = uuidv4();
  return request;
};


module.exports = { addTaskIdToHeader };
