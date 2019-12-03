const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const util = require('util');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const getConnectClient = require('../utils').getConnectClient;



// get a list of requests
const listRequests = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const response = await client.requests.list(
    bundle.inputData.status,
    bundle.inputData.product);
  return Promise.resolve(response);
};

const getTierAccount = (z, bundle, accountId) => {
  const options = {
    url: `${bundle.authData.endpoint}/tier/accounts/${accountId}`,
  }
  const responsePromise = z.request(options);
  return responsePromise
    .then(response => {
      console.log(response);
      return z.JSON.parse(response.content)
    });  
}

// const lookupAccounts = (z, bundle) => {
//   return new Promise((resolve, reject) => {
//     const tierAccountLookups = [
//       getTierAccount(z, bundle, bundle.inputData.customer_account_id),
//       getTierAccount(z, bundle, bundle.inputData.t1_account_id)
//     ];
//     if (bundle.inputData.t2_account_id) {
//       tierAccountLookups.push(
//         getTierAccount(z, bundle, bundle.inputData.t2_account_id)
//       );
//     }
  
//     Promise.all(tierAccountLookups).then(values => {
//       z.console.log(util.inspect(values, false, null, true))
//       resolve(_.zipObject(['customer', 'tier1', 'tier2'], values));
//     });
//   });
// }

const parsePhoneNumber = (number, country) => {
  const parsed = phoneUtil.parseAndKeepRawInput(number, country);
  const country_code = '+' + parsed.getCountryCode();
  const num = (parsed.getItalianLeadingZero() ? '0' : '') + parsed.getNationalNumber();
  return {
    country_code: country_code,
    area_code: num.substr(0, 3),
    phone_number: num.substr(3),
    extension: parsed.getExtension() || ''
  }
};

const createRequest = (z, bundle) => {
  const options = {
    method: 'POST',
    url: `${bundle.authData.endpoint}/requests`,
    body: {
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
    }
  };
  console.log('options', util.inspect(options, false, null, true));
  return z.request(options).then(response => z.JSON.parse(response.content));

  // return new Promise((resolve, reject) => {
  //   lookupAccounts(z, bundle).then(data => {
  //     options.body.asset.tiers.customer = data.customer;
  //     options.body.asset.tiers.tier1 = data.tier1;
  //     options.body.asset.tiers.tier2 = data.tier2 || {};
  //     z.console.log(util.inspect(options, true, null, true));
  //     resolve(z.request(options).then(response => z.JSON.parse(response.content)));
  //   });
  // });
};

module.exports = {
  key: 'request',
  noun: 'Request',

  create: {
    display: {
      label: 'Create Request',
      description: 'Creates a new request.'
    },
    operation: {
      inputFields: [
        // general
        {key: 'product_id', label: 'Product ID', required: true},
        {key: 'marketplace_id', label: 'Marketplace ID', required: true},
        {key: 'connection_id', label: 'Connection ID', required: true},
        // tier 1
        {key: 't1_company_name', label: 'T1 Company', required: true},
        {key: 't1_address1', label: 'T1 Address Line 1', required: true},
        {key: 't1_address2', label: 'T1 Address Line 2', required: false},
        {key: 't1_postal_code', label: 'T1 Postal Code', required: true},
        {key: 't1_city', label: 'T1 City', required: true},
        {key: 't1_state', label: 'T1 State', required: true},
        {key: 't1_country', label: 'T1 Country', required: true},
        {key: 't1_first_name', label: 'T1 Contact First Name', required: true},
        {key: 't1_last_name', label: 'T1 Contact Last Name', required: true},
        {key: 't1_email', label: 'T1 Email', required: true},
        {key: 't1_phone', label: 'T1 Phone Number', required: true},
        // customer 
        {key: 'customer_company_name', label: 'Customer Company', required: true},
        {key: 'customer_address1', label: 'Customer Address Line 1', required: true},
        {key: 'customer_address2', label: 'Customer Address Line 2', required: false},
        {key: 'customer_postal_code', label: 'Customer Postal Code', required: true},
        {key: 'customer_city', label: 'Customer City', required: true},
        {key: 'customer_state', label: 'Customer State', required: true},
        {key: 'customer_country', label: 'Customer Country', required: true},
        {key: 'customer_first_name', label: 'Customer Contact First Name', required: true},
        {key: 'customer_last_name', label: 'Customer Contact Last Name', required: true},
        {key: 'customer_email', label: 'Customer Email', required: true},
        {key: 'customer_phone', label: 'Customer Phone Number', required: true},
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
      perform: createRequest
    },
  },
  list: {
    display: {
      label: 'New requests',
      description: 'Triggers when there are new requests.'
    },
    operation: {      
      inputFields: [
        {
          key: 'status',
          required: true,
          choices: {
            pending: 'Pending',
            inquiring: 'Inquiring',
            approved: 'Approved',
            failed: 'Failed'
          },
          list: true
        },
        {
          key: 'product',
          required: true,
          label: 'Product',
          dynamic: 'product.id.name',
          list: true
        }, // will call the trigger with a key of project     
        {
          key: '_task_id'
        }   
      ],
      perform: listRequests
    }
  },

  sample: require('../samples/request'),
  outputFields: [
    {key: '_task_id', label: 'Task ID'},
    {key: 'id', label: 'Request ID'},
    {key: 'status', label: 'Request Status'},
    {key: 'created', label: 'Request Created At'},
    {key: 'updated', label: 'Request Updated At'},
    {key: 'asset__id', label: 'Asset ID'},
    {key: 'asset__product__id', label: 'Product ID'},
    {key: 'asset__product__name', label: 'Product Name'},
    {key: 'asset__marketplace__id', label: 'Marketplace ID'},
    {key: 'asset__marketplace__name', label: 'Marketplace Name'},
    {key: 'asset__tiers__tier1__id', label: 'T1 ID'},
    {key: 'asset__tiers__tier1__name', label: 'T1 Company Name'},
    {key: 'asset__tiers__tier1__contact_info__address_line1', label: 'T1 Address Line 1'},
    {key: 'asset__tiers__tier1__contact_info__address_line2', label: 'T1 Address Line 2'},
    {key: 'asset__tiers__tier1__contact_info__city', label: 'T1 City'},
    {key: 'asset__tiers__tier1__contact_info__state', label: 'T1 State'},
    {key: 'asset__tiers__tier1__contact_info__postal_code', label: 'T1 Postal Code'},
    {key: 'asset__tiers__tier1__contact_info__contact__phone_number__country_code', label: 'T1 Phone Country Code'},
    {key: 'asset__tiers__tier1__contact_info__contact__phone_number__area_code', label: 'T1 Phone Area Code'},
    {key: 'asset__tiers__tier1__contact_info__contact__phone_number__phone_number', label: 'T1 Phone Number'},
    {key: 'asset__tiers__tier1__contact_info__contact__phone_number__extension', label: 'T1 Phone Extension'},
    {key: 'asset__tiers__customer__id', label: 'Customer ID'},
    {key: 'asset__tiers__customer__name', label: 'Customer Company Name'},
    {key: 'asset__tiers__customer__contact_info__address_line1', label: 'Customer Address Line 1'},
    {key: 'asset__tiers__customer__contact_info__address_line2', label: 'Customer Address Line 2'},
    {key: 'asset__tiers__customer__contact_info__city', label: 'Customer City'},
    {key: 'asset__tiers__customer__contact_info__state', label: 'Customer State'},
    {key: 'asset__tiers__customer__contact_info__postal_code', label: 'Customer Postal Code'},
    {key: 'asset__tiers__customer__contact_info__contact__phone_number__country_code', label: 'Customer Phone Country Code'},
    {key: 'asset__tiers__customer__contact_info__contact__phone_number__area_code', label: 'Customer Phone Area Code'},
    {key: 'asset__tiers__customer__contact_info__contact__phone_number__phone_number', label: 'Customer Phone Number'},
    {key: 'asset__tiers__customer__contact_info__contact__phone_number__extension', label: 'Customer Phone Extension'},
    {key: 'asset__items[]id', label: 'Item ID'},
    {key: 'asset__items[]mpn', label: 'Item MPN'},
    {key: 'asset__items[]display_name', label: 'Item Display Name'},
    {key: 'asset__items[]item_type', label: 'Item Type'},
    {key: 'asset__items[]period', label: 'Item Period'},
    {key: 'asset__items[]old_quantity', label: 'Item Old Quantity'},
    {key: 'asset__items[]quantity', label: 'Item Quantity'}
  ]
};
