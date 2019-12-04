/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const authentication = require('./lib/authentication');
const middleware = require('./lib/middleware');

// triggers
const LatestPublishedProduct = require('./lib/triggers/latest_published_products');
const NewRequests = require('./lib/triggers/new_requests');
const ActivationTemplates = require('./lib/triggers/activation_templates')
// creates 
const RejectRequest = require('./lib/creates/reject_request');
const CreateRequest = require('./lib/creates/create_request');
const ApproveRequest = require('./lib/creates/approve_request');
const InquireRequest = require('./lib/creates/inquire_request');


const App = {
    version: require('./package.json').version,
    platformVersion: require('zapier-platform-core').version,
    authentication: authentication.authentication,
    beforeRequest: [middleware.addTaskIdToHeader],
    afterResponse: [],
    resources: {},
    triggers: {
        [LatestPublishedProduct.key]: LatestPublishedProduct,
        [NewRequests.key]: NewRequests,
        [ActivationTemplates.key]: ActivationTemplates
    },
    searches: {},
    creates: {
        [RejectRequest.key]: RejectRequest,
        [CreateRequest.key]: CreateRequest,
        [ApproveRequest.key]: ApproveRequest,
        [InquireRequest.key]: InquireRequest
    }
};

module.exports = App;
