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
const FillTierParametersLIS = require('./lib/creates/fill_tier_parameters_lis');
const FillTierParameters = require('./lib/creates/fill_tier_parameters');
const ApproveTierConfigRequest = require('./lib/creates/approve_tier_config_request');
const FailTierConfigRequest = require('./lib/creates/fail_tier_config_request');
const InquireTierConfigRequestLIS = require('./lib/creates/inquire_tier_config_request_lis');
const InquireTierConfigRequest = require('./lib/creates/inquire_tier_config_request');
const CreateUpdateTierConfigRequestLIS = require('./lib/creates/create_update_tier_config_request_lis');
const CreateUpdateTierConfigRequest = require('./lib/creates/create_update_tier_config_request');
// searches
const SearchRequest = require('./lib/searches/search_requests');
const SearchTierConfigRequest = require('./lib/searches/search_tier_config_requests');

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
    [SearchTierConfigRequest.key]: SearchTierConfigRequest,
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
    [FillTierParametersLIS.key]: FillTierParametersLIS,
    [FillTierParameters.key]: FillTierParameters,
    [CreateMessage.key]: CreateMessage,
    [ApproveTierConfigRequest.key]: ApproveTierConfigRequest,
    [FailTierConfigRequest.key]: FailTierConfigRequest,
    [InquireTierConfigRequestLIS.key]: InquireTierConfigRequestLIS,
    [InquireTierConfigRequest.key]: InquireTierConfigRequest,
    [CreateUpdateTierConfigRequestLIS.key]: CreateUpdateTierConfigRequestLIS,
    [CreateUpdateTierConfigRequest.key]: CreateUpdateTierConfigRequest
  },
};

module.exports = App;
