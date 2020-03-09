/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { Subscriptions } = require('@cloudblueconnect/connect-javascript-sdk');


const createBillingRequest = async (client, data) => {
  const sub = new Subscriptions(client);
  const response = await sub.createBillingRequest(data);
  return Promise.resolve(response);
};

module.exports = {
  createBillingRequest,
};
