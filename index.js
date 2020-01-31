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
const NewProductEvent = require('./lib/triggers/new_product_event');
const AccountUsers = require('./lib/triggers/account_users');
// creates
const RejectRequest = require('./lib/creates/reject_request');
const CreateAssetPurchaseRequest = require('./lib/creates/create_asset_purchase_request');
const CreateAssetChangeRequest = require('./lib/creates/create_asset_change_request');
const CreateAssetSuspendRequest = require('./lib/creates/create_asset_suspend_request');
const CreateAssetResumeRequest = require('./lib/creates/create_asset_resume_request');
const CreateAssetCancelRequest = require('./lib/creates/create_asset_cancel_request');
const CreateAssetRequestsFromOrder = require('./lib/creates/requests_from_order');
const ApproveRequest = require('./lib/creates/approve_request');
const InquireRequestLIS = require('./lib/creates/inquire_request_lis');
const InquireRequest = require('./lib/creates/inquire_request');
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
    [NewProductEvent.key]: NewProductEvent,
    [NewRequests.key]: NewRequests,
    [NewUpdatedRequests.key]: NewUpdatedRequests,
    [NewTierConfigRequests.key]: NewTierConfigRequests,
    [NewUpdatedTierConfigRequests.key]: NewUpdatedTierConfigRequests,
    [GetMessagesRequest.key]: GetMessagesRequest,
    [LatestPublishedProduct.key]: LatestPublishedProduct,
    [ActivationTemplates.key]: ActivationTemplates,
    [FulfillmentParameters.key]: FulfillmentParameters,
    [Hubs.key]: Hubs,
    [AccountUsers.key]: AccountUsers,
  },
  searches: {
    [SearchRequest.key]: SearchRequest,
    [SearchTierConfigRequest.key]: SearchTierConfigRequest,
  },
  creates: {
    [CreateAssetRequestsFromOrder.key]: CreateAssetRequestsFromOrder,
    [CreateAssetPurchaseRequest.key]: CreateAssetPurchaseRequest,
    [CreateAssetChangeRequest.key]: CreateAssetChangeRequest,
    [CreateAssetSuspendRequest.key]: CreateAssetSuspendRequest,
    [CreateAssetResumeRequest.key]: CreateAssetResumeRequest,
    [CreateAssetCancelRequest.key]: CreateAssetCancelRequest,
    [ApproveRequest.key]: ApproveRequest,
    [InquireRequest.key]: InquireRequest,
    [InquireRequestLIS.key]: InquireRequestLIS,
    [RejectRequest.key]: RejectRequest,
    [FillFulfillmentParameters.key]: FillFulfillmentParameters,
    [FillFulfillmentParametersLIS.key]: FillFulfillmentParametersLIS,
    [CreateUpdateTierConfigRequest.key]: CreateUpdateTierConfigRequest,
    [CreateUpdateTierConfigRequestLIS.key]: CreateUpdateTierConfigRequestLIS,
    [ApproveTierConfigRequest.key]: ApproveTierConfigRequest,
    [InquireTierConfigRequest.key]: InquireTierConfigRequest,
    [InquireTierConfigRequestLIS.key]: InquireTierConfigRequestLIS,
    [FillTierParameters.key]: FillTierParameters,
    [FillTierParametersLIS.key]: FillTierParametersLIS,
    [FailTierConfigRequest.key]: FailTierConfigRequest,
    [CreateMessage.key]: CreateMessage,
  },
};

module.exports = App;
