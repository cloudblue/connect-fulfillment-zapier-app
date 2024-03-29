/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');

const { parsePhoneNumber } = require('./phonenumbers');
const {
  sanitizeParams,
  sanitizeItems,
  itemDictToArray,
  paramDictToArray,
  processStructuredParams,
} = require('./data');

const buildTier = (data, t) => {
  const phone = parsePhoneNumber(data[`${t}_phone`], data[`${t}_country`]);
  return {
    name: data[`${t}_company_name`],
    external_id: data[`${t}_external_id`],
    external_uid: data[`${t}_external_uid`] || uuidv4(),
    contact_info: {
      address_line1: data[`${t}_address1`],
      address_line2: data[`${t}_address2`],
      postal_code: data[`${t}_postal_code`],
      city: data[`${t}_city`],
      state: data[`${t}_state`],
      country: data[`${t}_country`],
      contact: {
        phone_number: phone,
        first_name: data[`${t}_first_name`],
        last_name: data[`${t}_last_name`],
        email: data[`${t}_email`],
      },
    },
  };
};

const processItems = (items) => {
  if (Array.isArray(items)) {
    return sanitizeItems(items);
  }
  return itemDictToArray(items);
};

const buildPurchaseRequest = (data) => {
  const req = {
    type: 'purchase',
    asset: {
      external_id: data.asset_external_id,
      external_uid: data.asset_external_uid || uuidv4(),
      connection: {
        id: data.connection_id,
      },
      items: processItems(data.items),
      params: processStructuredParams(paramDictToArray(data.params)),
      tiers: {
        tier1: buildTier(data, 't1'),
        customer: buildTier(data, 'customer'),
      },
    },
  };
  if (data.reseller_tiers === 't2t1') {
    req.asset.tiers.tier2 = buildTier(data, 't2');
  }
  return req;
};

const buildAdjustmentRequest = (data) => {
  const req = {
    type: 'adjustment',
    asset: {
      external_id: data.asset_external_id,
      external_uid: data.asset_external_uid || uuidv4(),
      connection: {
        id: data.connection_id,
      },
      items: processItems(data.items),
      params: processStructuredParams(paramDictToArray(data.params)),
      tiers: {
        tier1: buildTier(data, 't1'),
        customer: buildTier(data, 'customer'),
      },
    },
  };
  if (data.reseller_tiers === 't2t1') {
    req.asset.tiers.tier2 = buildTier(data, 't2');
  }
  return req;
};


const buildChangeRequest = (data) => {
  const req = {
    type: 'change',
    asset: {
      id: data.asset_id,
      items: processItems(data.items),
    },
  };
  if (data.external_attributes) {
    if (Array.isArray(data.external_attributes)) {
      req.asset.external_attributes = sanitizeParams(data.external_attributes);
    } else {
      req.asset.external_attributes = paramDictToArray(data.external_attributes);
    }
  }
  return req;
};

const buildSuspendResumeCancelRequest = (data, type) => {
  const req = {
    type,
    asset: {
      id: data.asset_id,
    },
  };
  if (data.external_attributes) {
    req.asset.external_attributes = sanitizeParams(data.external_attributes);
  }
  return req;
};

module.exports = {
  buildPurchaseRequest,
  buildAdjustmentRequest,
  buildChangeRequest,
  buildSuspendResumeCancelRequest,
};
