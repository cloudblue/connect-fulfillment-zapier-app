// triggers
const LatestPublishedProduct = require('./latest_published_products');
const NewRequests = require('./new_requests');
const NewUpdatedRequests = require('./new_updated_requests');
const GetMessagesRequest = require('./new_message_request');
const ActivationTemplates = require('./activation_templates');
const FulfillmentParameters = require('./fulfillment_parameters');
const Hubs = require('./hubs');
const NewTierConfigRequests = require('./new_tier_config_requests');
const NewUpdatedTierConfigRequests = require('./new_updated_tier_config_requests');
const NewProductEvent = require('./new_product_event');
const AccountUsers = require('./account_users');

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
