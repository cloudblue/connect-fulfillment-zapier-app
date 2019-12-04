/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const getConnectClient = require('../utils').getConnectClient;


const updateRequestParameters = async (z, bundle) => {
    const client = getConnectClient(z, bundle);
    const response = await client.requests.updateRequestParameters(
        bundle.inputData.request_id,
        bundle.inputData.params,
        bundle.inputData.note
    );
    return Promise.resolve(response);
};


module.exports = {
    key: 'fill_fulfillment_params',
    noun: 'Fill fulfillment parameters',
    display: {
        label: 'Fill fulfillment parameters for Request',
        description: 'Fill fulfillment parameters for Request Asset'
    },
    operation: {
        inputFields: [
            { key: 'request_id', label: 'Request ID', required: true },
            {
                key: 'params',
                children: [
                    {
                        key: 'id',
                        required: true,
                        label: 'Parameter ID'
                    },
                    {
                        key: 'value',
                        required: true,
                        label: 'Value'              
                    },                    
                ]
            },
            { key: 'note', label: 'Note' },
        ],
        perform: updateRequestParameters,
        sample: require('../samples/request'),
    },
};
