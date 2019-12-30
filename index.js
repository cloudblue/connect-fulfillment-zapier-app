/**
 * This file is part of the Ingram Micro Cloud Blue Connect SDK.
 *
 * @copyright (c) 2019. Ingram Micro. All Rights Reserved.
 */

const zapier = require('zapier-platform-core');

const authentication = require('./lib/authentication');
const middleware = require('./lib/middleware');

// triggers
const LatestPublishedProduct = require('./lib/triggers/latest_published_products');
const NewRequests = require('./lib/triggers/new_requests');
const NewUpdatedRequests = require('./lib/triggers/new_updated_requests');
const GetMessagesRequest = require('./lib/triggers/new_message_request');
const ActivationTemplates = require('./lib/triggers/activation_templates');
const FulfillmentParameters = require('./lib/triggers/fulfillment_parameters');
const Hubs = require('./lib/triggers/hubs');
const NewTierConfigRequests = require('./lib/triggers/new_tier_config_requests');
const NewUpdatedTierConfigRequests = require('./lib/triggers/new_updated_tier_config_requests');
// creates
const RejectRequest = require('./lib/creates/reject_request');
const CreatePurchaseRequest = require('./lib/creates/create_purchase_request');
const ApproveRequest = require('./lib/creates/approve_request');
const InquireRequestLIS = require('./lib/creates/inquire_request_lis');
const InquireRequest = require('./lib/creates/inquire_request');
const NoteRequest = require('./lib/creates/note_request');
const CreateMessage = require('./lib/creates/create_message');
const FillFulfillmentParametersLIS = require('./lib/creates/fill_fulfillment_parameters_lis');
const FillFulfillmentParameters = require('./lib/creates/fill_fulfillment_parameters');
// searches
const SearchRequest = require('./lib/searches/search_requests');

const platformVersion = zapier.version;
const { version } = require('./package.json');

const App = {
  version,
  platformVersion,
  authentication: authentication.authentication,
  beforeRequest: [middleware.addTaskIdToHeader],
  afterResponse: [],
  resources: {},
  triggers: {
    [NewRequests.key]: NewRequests,
    [NewUpdatedRequests.key]: NewUpdatedRequests,
    [GetMessagesRequest.key]: GetMessagesRequest,
    [LatestPublishedProduct.key]: LatestPublishedProduct,
    [ActivationTemplates.key]: ActivationTemplates,
    [FulfillmentParameters.key]: FulfillmentParameters,
    [Hubs.key]: Hubs,
    [NewTierConfigRequests.key]: NewTierConfigRequests,
    [NewUpdatedTierConfigRequests.key]: NewUpdatedTierConfigRequests,
  },
  searches: {
    [SearchRequest.key]: SearchRequest,
  },
  creates: {
    [RejectRequest.key]: RejectRequest,
    [CreatePurchaseRequest.key]: CreatePurchaseRequest,
    [ApproveRequest.key]: ApproveRequest,
    [InquireRequest.key]: InquireRequest,
    [InquireRequestLIS.key]: InquireRequestLIS,
    [NoteRequest.key]: NoteRequest,
    [FillFulfillmentParametersLIS.key]: FillFulfillmentParametersLIS,
    [FillFulfillmentParameters.key]: FillFulfillmentParameters,
    [CreateMessage.key]: CreateMessage,
  },
};

module.exports = App;
