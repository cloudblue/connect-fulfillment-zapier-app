/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const { parsePhoneNumber } = require('./phonenumbers');
const {
  sanitizeParams,
  sanitizeItems,
  itemDictToArray,
  paramDictToArray,
  processStructuredParams,
} = require('./data');

const {
  getProductParameters,
} = require('./lookups');


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
      tiers: {
        tier1: buildTier(data, 't1'),
        customer: buildTier(data, 'customer'),
      },
    },
  };
  if (data.reseller_tiers === 't2t1') {
    req.asset.tiers.tier2 = buildTier(data, 't2');
  }
  if (data.params_input_mode && data.params_input_mode === 'form') {
    req.asset.params = data.params;
  } else {
    req.asset.params = processStructuredParams(paramDictToArray(data.params));
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

const buildParamsFromForm = async (client, data, productId) => {
  const paramDefs = await getProductParameters(client, productId, data.parameter_ids);
  const params = [];
  _.each(paramDefs, (def) => {
    if (def.type === 'address') {
      params.push({
        id: def.name,
        structured_value: {
          address_line1: data[`${def.name}_address_line1`],
          address_line2: data[`${def.name}_address_line2`],
          city: data[`${def.name}_city`],
          state: data[`${def.name}_state`],
          postal_code: data[`${def.name}_postal_code`],
          country: data[`${def.name}_country`],
        },
      });
    } else if (def.type === 'phone') {
      const countryCode = data[`${def.name}_country_code`];
      const phoneNumber = data[`${def.name}_phone_number`];
      const phone = parsePhoneNumber(`${countryCode}${phoneNumber}`, def.default.country);
      params.push({
        id: def.name,
        structured_value: phone,
      });
    } else if (def.type === 'checkbox') {
      const structuredValue = {};
      _.each(def.constraints.choices, (choice) => {
        structuredValue[choice.value] = data[def.name].includes(choice.value);
      });
      params.push({
        id: def.name,
        structured_value: structuredValue,
      });
    } else if (def.type === 'subdomain') {
      const subdomain = data[`${def.name}_subdomain`];
      const domain = data[`${def.name}_domain`];
      params.push({
        id: def.name,
        value: `${subdomain}.${domain}`,
      });
    } else {
      params.push({
        id: def.name,
        value: data[def.name],
      });
    }
  });
  return params;
};

module.exports = {
  buildPurchaseRequest,
  buildChangeRequest,
  buildSuspendResumeCancelRequest,
  buildParamsFromForm,
};
