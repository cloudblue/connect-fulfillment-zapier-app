/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const { Fulfillment } = require('@cloudblueconnect/connect-javascript-sdk');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const { getConnectClient } = require('../http');

const listRequests = async (z, bundle) => {
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const limit = 100;
  let offset = 0;
  let results = [];
  let response = [];
  /* eslint-disable no-await-in-loop */
  do {
    response = await ff.listRequests({
      status: bundle.inputData.status,
      assetProductId: bundle.inputData.product_id,
      assetProductName: bundle.inputData.product_name,
      assetConnectionHubId: bundle.inputData.hub_id,
      assetConnectionHubName: bundle.inputData.hub_name,
      assetConnectionProviderId: bundle.inputData.provider_id,
      assetConnectionProviderName: bundle.inputData.provider_name,
      assetConnectionVendorId: bundle.inputData.vendor_id,
      assetConnectionVendorName: bundle.inputData.vendor_name,
      assetTiersCustomerId: bundle.inputData.customer_id,
      assetTiersTier1Id: bundle.inputData.t1_id,
      assetTiersTier2Id: bundle.inputData.t2_id,
    }, limit, offset);
    results = results.concat(response);
    offset += limit;
  } while (response.length === limit);

  return Promise.resolve(results);
};

const parsePhoneNumber = (number, country) => {
  const parsed = phoneUtil.parseAndKeepRawInput(number, country);
  const countryCode = `+${parsed.getCountryCode()}`;
  const num = (parsed.getItalianLeadingZero() ? '0' : '') + parsed.getNationalNumber();
  return {
    country_code: countryCode,
    area_code: num.substr(0, 3),
    phone_number: num.substr(3),
    extension: parsed.getExtension() || '',
  };
};

const createRequest = async (z, bundle) => {
  const t1Phone = parsePhoneNumber(bundle.inputData.t1_phone, bundle.inputData.t1_country);
  const custPhone = parsePhoneNumber(
    bundle.inputData.customer_phone,
    bundle.inputData.customer_country,
  );
  const req = {
    type: 'purchase',
    asset: {
      external_uid: uuidv4(),
      connection: {
        id: bundle.inputData.connection_id,
      },
      items: bundle.inputData.items,
      params: bundle.inputData.params,
      tiers: {
        tier1: {
          name: bundle.inputData.t1_company_name,
          external_id: bundle.inputData.t1_external_id,
          external_uid: uuidv4(),
          contact_info: {
            address_line1: bundle.inputData.t1_address1,
            address_line2: bundle.inputData.t1_address2,
            postal_code: bundle.inputData.t1_postal_code,
            city: bundle.inputData.t1_city,
            state: bundle.inputData.t1_state,
            country: bundle.inputData.t1_country,
            contact: {
              phone_number: t1Phone,
              first_name: bundle.inputData.t1_first_name,
              last_name: bundle.inputData.t1_last_name,
              email: bundle.inputData.t1_email,
            },
          },
        },
        customer: {
          name: bundle.inputData.customer_company_name,
          external_uid: uuidv4(),
          contact_info: {
            address_line1: bundle.inputData.customer_address1,
            address_line2: bundle.inputData.customer_address2,
            postal_code: bundle.inputData.customer_postal_code,
            city: bundle.inputData.customer_city,
            state: bundle.inputData.customer_state,
            country: bundle.inputData.customer_country,
            contact: {
              phone_number: custPhone,
              first_name: bundle.inputData.customer_first_name,
              last_name: bundle.inputData.customer_last_name,
              email: bundle.inputData.customer_email,
            },
          },
        },
      },
    },
  };
  /* eslint-disable no-param-reassign */
  _.each(req.asset.items, (item) => {
    item.id = item.item_id;
    delete item.item_id;
  });
  _.each(req.asset.params, (param) => {
    param.id = param.param_id;
    delete param.param_id;
  });
  const ff = new Fulfillment(getConnectClient(z, bundle));
  const response = await ff.createRequest(req);
  return Promise.resolve(response);
};

module.exports = { listRequests, createRequest };
