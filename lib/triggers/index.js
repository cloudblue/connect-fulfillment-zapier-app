// triggers
const LatestPublishedProduct = require('./hidden/latest_published_products');
const NewRequests = require('./assetRequests/new_requests');
const NewUpdatedRequests = require('./assetRequests/new_updated_requests');
const GetMessagesRequest = require('./new_message_request');
const ActivationTemplates = require('./hidden/activation_templates');
const FulfillmentParameters = require('./hidden/fulfillment_parameters');
const Hubs = require('./hidden/hubs');
const NewTierConfigRequests = require('./tierConfigRequests/new_tier_config_requests');
const NewUpdatedTierConfigRequests = require('./tierConfigRequests/new_updated_tier_config_requests');
const NewProductEvent = require('./new_product_event');
const AccountUsers = require('./hidden/account_users');

module.exports = {
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
};
