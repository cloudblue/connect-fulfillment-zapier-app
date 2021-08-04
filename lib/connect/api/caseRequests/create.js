/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */
const buildPayloadNew = (data) => ({
  product: {
    id: data.product_id,
  },
  subject: data.subject,
  description: data.description,
  priority: data.priority,
  type: data.type,
  issuer: {
    recipients: data.issuer_recipients,
  },
  receiver: {
    account: {
      id: data.account_id,
    },
  },
});

const buildPayloadUpdate = (data) => ({
  product: { id: data.product_id },
  subject: data.subject,
  description: data.description,
  issuer: {
    account: { id: data.issuer_account },
    actor: { id: data.issuer_actor },
    recipients: data.issuer_recipients,
  },
  receiver: {
    account: { id: data.receiver_account },
    actor: { id: data.receiver_actor },
    recipients: data.receiver_recipients,
  },
});

const createCaseRequest = async (client, data) => {
  return  await client.cases.create(buildPayloadNew(data));
};

const createCommentByCaseId = async (client, data) => {
  const response = await client.conversations.createMessage(data.case_id, data.text);
  return Promise.resolve(response);
};

const updateCaseRequest = async (client, data) => {
  const response = await client.cases.update(data.case_id, buildPayloadUpdate(data));
  return Promise.resolve(response);
};

module.exports = {
  createCaseRequest,
  createCommentByCaseId,
  updateCaseRequest,
};
