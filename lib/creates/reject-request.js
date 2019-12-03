const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const util = require('util');
const getConnectClient = require('../utils').getConnectClient;

/* Reject a request 
* Call method rejectRequest of Javascript SDK 
* @return {*}    [Check return type]*
*/
const rejectRequest = async (z, bundle) => {
  const client = getConnectClient(z, bundle);
  const response = await client.requests.rejectRequest(
    bundle.inputData.requestId,
    bundle.inputData.reason);
  return Promise.resolve(response);
};

module.exports = {
  key: 'rejectRequest',
  noun: 'Reject a Request',
  display: {
    label: 'Reject a Request',
    description: 'Creates a new request.'
  },
  operation: {
    inputFields: [
      {key: 'requestId', label: 'Request ID', required: true},
      {key: 'reason', label: 'Reason', required: true}
    ],
    perform: rejectRequest,
    sample: require('../samples/reject-request'),
  },
};
