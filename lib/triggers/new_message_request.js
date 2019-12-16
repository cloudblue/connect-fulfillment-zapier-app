/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const getConnectClient = require('../utils').getConnectClient;

const getMessagesRequest = async (z, bundle) => {
    const client = getConnectClient(z, bundle);
    const response = await client.conversations.getMessages(
        bundle.inputData.id);
    return Promise.resolve(response);
};

module.exports = {
    key: 'get_messages',
    noun: 'Get messages',

    display: {
        label: 'Get Messages',
        description: 'Triggers when new messages requests are available.'
    },

    operation: {
        inputFields: [
            {
                key: 'id',
                required: true,
                list: true
            },
        ],
        perform: getMessagesRequest,

        sample: require('../samples/get_messages')
/*        outputFields: [
            { key: 'id', label: 'Request ID' },
            { key: 'status', label: 'Request Status' },
            { key: 'created', label: 'Request Created At' },
            { key: 'updated', label: 'Request Updated At' },
            { key: 'asset__id', label: 'Asset ID' },
            { key: 'asset__product__id', label: 'Product ID' },
            { key: 'asset__product__name', label: 'Product Name' },
            { key: 'asset__marketplace__id', label: 'Marketplace ID' },
            { key: 'asset__marketplace__name', label: 'Marketplace Name' },
            { key: 'asset__tiers__tier1__id', label: 'T1 ID' },
            { key: 'asset__tiers__tier1__name', label: 'T1 Company Name' },
            { key: 'asset__tiers__tier1__contact_info__address_line1', label: 'T1 Address Line 1' },
            { key: 'asset__tiers__tier1__contact_info__address_line2', label: 'T1 Address Line 2' },
            { key: 'asset__tiers__tier1__contact_info__city', label: 'T1 City' },
            { key: 'asset__tiers__tier1__contact_info__state', label: 'T1 State' },
            { key: 'asset__tiers__tier1__contact_info__postal_code', label: 'T1 Postal Code' },
            { key: 'asset__tiers__tier1__contact_info__contact__phone_number__country_code', label: 'T1 Phone Country Code' },
            { key: 'asset__tiers__tier1__contact_info__contact__phone_number__area_code', label: 'T1 Phone Area Code' },
            { key: 'asset__tiers__tier1__contact_info__contact__phone_number__phone_number', label: 'T1 Phone Number' },
            { key: 'asset__tiers__tier1__contact_info__contact__phone_number__extension', label: 'T1 Phone Extension' },
            { key: 'asset__tiers__customer__id', label: 'Customer ID' },
            { key: 'asset__tiers__customer__name', label: 'Customer Company Name' },
            { key: 'asset__tiers__customer__contact_info__address_line1', label: 'Customer Address Line 1' },
            { key: 'asset__tiers__customer__contact_info__address_line2', label: 'Customer Address Line 2' },
            { key: 'asset__tiers__customer__contact_info__city', label: 'Customer City' },
            { key: 'asset__tiers__customer__contact_info__state', label: 'Customer State' },
            { key: 'asset__tiers__customer__contact_info__postal_code', label: 'Customer Postal Code' },
            { key: 'asset__tiers__customer__contact_info__contact__phone_number__country_code', label: 'Customer Phone Country Code' },
            { key: 'asset__tiers__customer__contact_info__contact__phone_number__area_code', label: 'Customer Phone Area Code' },
            { key: 'asset__tiers__customer__contact_info__contact__phone_number__phone_number', label: 'Customer Phone Number' },
            { key: 'asset__tiers__customer__contact_info__contact__phone_number__extension', label: 'Customer Phone Extension' },
            { key: 'asset__items[]id', label: 'Item ID' },
            { key: 'asset__items[]mpn', label: 'Item MPN' },
            { key: 'asset__items[]display_name', label: 'Item Display Name' },
            { key: 'asset__items[]item_type', label: 'Item Type' },
            { key: 'asset__items[]period', label: 'Item Period' },
            { key: 'asset__items[]old_quantity', label: 'Item Old Quantity' },
            { key: 'asset__items[]quantity', label: 'Item Quantity' }
        ]
*/        
    }
};
