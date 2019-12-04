/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const util = require('util');
const getConnectClient = require('../utils').getConnectClient;


const inquireRequest = async (z, bundle) => {
    const client = getConnectClient(z, bundle);
    const response = await client.requests.inquireRequest(
        bundle.inputData.request_id,
        bundle.inputData.reason,
        bundle.inputData.template_id,
        bundle.inputData.params);
    return Promise.resolve(response);
};

module.exports = {
    key: 'inquire_request',
    noun: 'Inquire a Request',
    display: {
        label: 'Inquire a Request',
        description: 'Put the status of the Request in Inquire with the reason by product'
    },
    operation: {
        inputFields: [
            { key: 'request_id', label: 'Request ID', required: true },
            { key: 'reason', label: 'Reason', required: true },
            { key: 'template_id', label: 'Template ID', required: true },
            {
                key: 'params',
                children: [
                    {
                        key: 'id',
                        required: true,
                        label: 'Parameter ID'
                    },
                    {
                        key: 'value_error',
                        required: true,
                        label: 'Error Text'
                    },
                ]
            },
        ],
        perform: inquireRequest,
        sample: require('../samples/inquire_request'),
    },
};
