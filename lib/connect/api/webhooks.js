/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');

const createWebhook = async (client, data) => {
  const label = `[Zap-${data.zap_id}] ${data.label}`;
  // eslint-disable-next-line prefer-destructuring
  let description = data.description;
  if (description.trim().length === 0) {
    description = label;
  }

  const body = {
    label,
    product_id: data.product_id,
    external_url: data.target_url,
    jwt_secret: `JWT-${uuidv4()}`,
    active: true,
    description,
    http_method: 'POST',
    data: {},
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return client.webhooks.create(body);
};

const deleteWebhook = async (client, data) => {
  await client.webhooks.delete(data.id);
  return Promise.resolve({});
};

module.exports = {
  createWebhook,
  deleteWebhook,
};
