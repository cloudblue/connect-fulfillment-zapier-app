/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { getConnectClient } = require('../../connect/http');
const { getTCRParametersByConfigId } = require('../../connect/api/misc');
const sample = require('../../samples/product_params');


module.exports = {
  key: 'tcr_parameters',
  noun: 'Ordering And Fulfillment Parameters',

  display: {
    label: 'Get a list of ordering and fulfillment parameters for TCR',
    description: 'Hidden trigger.',
    hidden: true,
  },

  operation: {
    inputFields: [
    ],
    perform: async (z, bundle) => {
      const client = getConnectClient(z, bundle);
      return getTCRParametersByConfigId(client, bundle.inputData.config_id);
    },

    sample,

    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
    ],
  },
};
