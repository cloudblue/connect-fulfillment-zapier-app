/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');

const addTaskIdToHeader = (request, z, bundle) => {
    request.headers['x-zapier-fulfillment-taskid'] = uuidv4();
    return request;
};


module.exports = { addTaskIdToHeader };
