/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { Directory } = require('@cloudblueconnect/connect-javascript-sdk');

const { parsePhoneNumber } = require('../helpers/phonenumbers');


const buildAccount = (data) => {
  const phone = parsePhoneNumber(data.phone, data.country);
  return {
    name: data.company_name,
    external_id: data.external_id,
    external_uid: data.external_uid,
    contact_info: {
      address_line1: data.address1,
      address_line2: data.address2,
      postal_code: data.postal_code,
      city: data.city,
      state: data.state,
      country: data.country,
      contact: {
        phone_number: phone,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      },
    },
  };
};

const createTierAccountRequest = async (client, data) => {
  const dir = new Directory(client);
  const response = await dir.createTierAccountRequest({
    type: 'update',
    account: buildAccount(data),
  });
  return Promise.resolve({
    requests: response,
  });
};

module.exports = {
  createTierAccountRequest,
};
