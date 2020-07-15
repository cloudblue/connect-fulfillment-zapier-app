/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const _ = require('lodash');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const { getConnectClient } = require('../../connect/http');
const { getProductIdFromItems } = require('../../connect/api/helpers/data');
const {
  getProductIdByRequestId,
  getProductIdByTierConfigurationId,
  getProductIdByTCRId,
  getProductParameters,
} = require('../../connect/api/misc');


const fieldsToChoices = (fields) => {
  const choices = {};
  _.each(fields, (definition, id) => {
    choices[id] = definition.default.label;
  });
  return choices;
};

const buildAddressFields = (param) => [
  {
    key: `${param.name}_address_line1`,
    label: `${param.title} - Address Line 1`,
    required: true,
  },
  {
    key: `${param.name}_address_line2`,
    label: `${param.title} - Address Line 2`,
    required: false,
  },
  {
    key: `${param.name}_postal_code`,
    label: `${param.title} - Postal Code`,
    required: true,
  },
  {
    key: `${param.name}_city`,
    label: `${param.title} - City`,
    required: true,
  },
  {
    key: `${param.name}_state`,
    label: `${param.title} - State or Province`,
    required: true,
  },
  {
    key: `${param.name}_country`,
    label: `${param.title} - Country`,
    required: true,
    helpText: 'Please use Alpha-2 code.',
    default: param.default.country,
  },
];

const buildChoicesField = (param, list) => {
  const field = {
    key: param.name,
    label: param.title,
    list,
    choices: {},
  };
  _.forEach(param.constraints.choices, (choice) => {
    field.choices[choice.value] = choice.label;
    if (choice.default) {
      field.default = choice.value;
    }
  });
  return field;
};

const buildSubdomainFields = (param) => {
  const field = {
    key: `${param.name}_domain`,
    label: `${param.title} - Domain`,
    choices: {},
    required: true,
  };
  _.forEach(param.constraints.choices, (choice) => {
    field.choices[choice.value] = choice.label;
    if (choice.default) {
      field.default = choice.value;
    }
  });
  return [
    {
      key: `${param.name}_subdomain`,
      label: `${param.title} - Subdomain`,
      required: true,
    },
    field,
  ];
};

const buildPhoneFields = (param) => {
  let countryCode = '';
  if (param.default.country) {
    try {
      countryCode = `+${phoneUtil.getCountryCodeForRegion(param.default.country)}`;
    } catch (e) {
      console.log(e);
    }
  }
  return [
    {
      key: `${param.name}_country_code`,
      label: `${param.title} - Country Code`,
      required: true,
      default: `${countryCode}`,
    },
    {
      key: `${param.name}_phone_number`,
      label: `${param.title} - Phone Number`,
      required: true,
    },
  ];
};

async function generateParametersFields(client, productId, parameterIds) {
  const fields = [];
  const params = await getProductParameters(
    client,
    productId,
    parameterIds,
  );
  _.forEach(params, (param) => {
    if (param.type === 'address') {
      fields.push(...buildAddressFields(param));
    } else if (param.type === 'checkbox') {
      fields.push(buildChoicesField(param, true));
    } else if (param.type === 'choice' || param.type === 'dropdown') {
      fields.push(buildChoicesField(param, false));
    } else if (param.type === 'phone') {
      fields.push(...buildPhoneFields(param, false));
    } else if (param.type === 'subdomain') {
      fields.push(...buildSubdomainFields(param));
    } else {
      fields.push({
        key: `${param.name}`,
        label: `${param.title}`,
        required: true,
      });
    }
  });
  return fields;
}

async function generateParametersFieldsForCreate(z, bundle) {
  const client = getConnectClient(z, bundle);
  const productId = getProductIdFromItems(bundle.inputData.items);
  if (productId === null) {
    return [];
  }
  return generateParametersFields(client, productId, bundle.inputData.parameter_ids);
}

async function generateParametersFieldsForFill(z, bundle) {
  const client = getConnectClient(z, bundle);
  const productId = await getProductIdByRequestId(client, bundle.inputData.request_id);
  if (productId === null) {
    return [];
  }
  return generateParametersFields(client, productId, bundle.inputData.parameter_ids);
}

async function generateParametersFieldsForTCR(z, bundle) {
  const client = getConnectClient(z, bundle);
  const productId = await getProductIdByTierConfigurationId(client, bundle.inputData.config_id);
  if (productId === null) {
    return [];
  }
  return generateParametersFields(client, productId, bundle.inputData.parameter_ids);
}

async function generateParametersFieldsForTCRFill(z, bundle) {
  const client = getConnectClient(z, bundle);
  const productId = await getProductIdByTCRId(client, bundle.inputData.request_id);
  if (productId === null) {
    return [];
  }
  return generateParametersFields(client, productId, bundle.inputData.parameter_ids);
}


module.exports = {
  fieldsToChoices,
  generateParametersFieldsForCreate,
  generateParametersFieldsForFill,
  generateParametersFieldsForTCR,
  generateParametersFieldsForTCRFill,
};
