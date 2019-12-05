/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const getConnectClient = require('../utils').getConnectClient;


const parsePhoneNumber = (number, country) => {
    const parsed = phoneUtil.parseAndKeepRawInput(number, country);
    const country_code = '+' + parsed.getCountryCode();
    const num = (parsed.getItalianLeadingZero() ? '0' : '') + parsed.getNationalNumber();
    return {
        country_code: country_code,
        area_code: num.substr(0, 3),
        phone_number: num.substr(3),
        extension: parsed.getExtension() || ''
    }
};

const createRequest = async (z, bundle) => {

    const req = {
        type: 'purchase',
        asset: {
            product: {
                id: bundle.inputData.product_id
            },
            external_uid: uuidv4(),
            connection: {
                id: bundle.inputData.connection_id
            },
            items: bundle.inputData.items,
            tiers: {
                tier1: {
                    name: bundle.inputData.t1_company_name,
                    external_uid: uuidv4(),
                    contact_info: {
                        address_line1: bundle.inputData.t1_address1,
                        address_line2: bundle.inputData.t1_address2,
                        postal_code: bundle.inputData.t1_postal_code,
                        city: bundle.inputData.t1_city,
                        state: bundle.inputData.t1_state,
                        country: bundle.inputData.t1_country,
                        contact: {
                            phone_number: parsePhoneNumber(bundle.inputData.t1_phone, bundle.inputData.t1_country),
                            first_name: bundle.inputData.t1_first_name,
                            last_name: bundle.inputData.t1_last_name,
                            email: bundle.inputData.t1_email
                        }
                    }
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
                            phone_number: parsePhoneNumber(bundle.inputData.customer_phone, bundle.inputData.customer_country),
                            first_name: bundle.inputData.customer_first_name,
                            last_name: bundle.inputData.customer_last_name,
                            email: bundle.inputData.customer_email
                        }
                    }
                }
            }
        },
        marketplace: {
            id: bundle.inputData.marketplace_id
        }
    };

    const client = getConnectClient(z, bundle);
    const response = await client.requests.create(req);
    return Promise.resolve(response);
};


module.exports = {
    key: 'create_request',
    noun: 'Create Request',
    display: {
        label: 'Create Request',
        description: 'Creates a new Request.'
    },
    operation: {
        inputFields: [
            // general
            { key: 'product_id', label: 'Product ID', required: true },
            { key: 'marketplace_id', label: 'Marketplace ID', required: true },
            { key: 'connection_id', label: 'Connection ID', required: true },
            // tier 1
            { key: 't1_company_name', label: 'T1 Company', required: true },
            { key: 't1_address1', label: 'T1 Address Line 1', required: true },
            { key: 't1_address2', label: 'T1 Address Line 2', required: false },
            { key: 't1_postal_code', label: 'T1 Postal Code', required: true },
            { key: 't1_city', label: 'T1 City', required: true },
            { key: 't1_state', label: 'T1 State', required: true },
            { key: 't1_country', label: 'T1 Country', required: true },
            { key: 't1_first_name', label: 'T1 Contact First Name', required: true },
            { key: 't1_last_name', label: 'T1 Contact Last Name', required: true },
            { key: 't1_email', label: 'T1 Email', required: true },
            { key: 't1_phone', label: 'T1 Phone Number', required: true },
            // customer 
            { key: 'customer_company_name', label: 'Customer Company', required: true },
            { key: 'customer_address1', label: 'Customer Address Line 1', required: true },
            { key: 'customer_address2', label: 'Customer Address Line 2', required: false },
            { key: 'customer_postal_code', label: 'Customer Postal Code', required: true },
            { key: 'customer_city', label: 'Customer City', required: true },
            { key: 'customer_state', label: 'Customer State', required: true },
            { key: 'customer_country', label: 'Customer Country', required: true },
            { key: 'customer_first_name', label: 'Customer Contact First Name', required: true },
            { key: 'customer_last_name', label: 'Customer Contact Last Name', required: true },
            { key: 'customer_email', label: 'Customer Email', required: true },
            { key: 'customer_phone', label: 'Customer Phone Number', required: true },
            // items
            {
                key: 'items',
                children: [
                    {
                        key: 'id',
                        label: 'ID',
                        required: true
                    },
                    {
                        key: 'quantity',
                        label: 'Quantity',
                        required: true
                    }
                ]
            },
        ],
        perform: createRequest,
        sample: require('../samples/request'),
    },
};