// triggers
const VisibleProducts = require('./hidden/visible_products');
const NewRequests = require('./assetRequests/new_requests');
const NewUpdatedRequests = require('./assetRequests/new_updated_requests');
const GetMessagesRequest = require('./new_message_request');
const NewConversations = require('./new_conversations');

const ActivationTemplates = require('./hidden/activation_templates');
const FulfillmentParameters = require('./hidden/fulfillment_parameters');
const Hubs = require('./hidden/hubs');
const NewTierConfigRequests = require('./tierConfigRequests/new_tier_config_requests');
const NewUpdatedTierConfigRequests = require('./tierConfigRequests/new_updated_tier_config_requests');
const NewTierAccountRequests = require('./tierAccountRequests/new_requests');
const NewUpdatedTierAccountRequests = require('./tierAccountRequests/new_updated_requests');
const NewProductEvent = require('./new_product_event');
const AccountUsers = require('./hidden/account_users');
const NewBillingRequests = require('./billingRequests/new_requests');
const NewUpdatedBillingRequests = require('./billingRequests/new_updated_requests');
const NewRecurringAssets = require('./recurringAssets/new_recurring_assets');
const NewUpdatedRecurringAssets = require('./recurringAssets/new_updated_recurring_assets');


module.exports = {
  [NewProductEvent.key]: NewProductEvent,
  [NewRequests.key]: NewRequests,
  [NewUpdatedRequests.key]: NewUpdatedRequests,
  [NewBillingRequests.key]: NewBillingRequests,
  [NewUpdatedBillingRequests.key]: NewUpdatedBillingRequests,
  [NewRecurringAssets.key]: NewRecurringAssets,
  [NewUpdatedRecurringAssets.key]: NewUpdatedRecurringAssets,
  [NewTierConfigRequests.key]: NewTierConfigRequests,
  [NewUpdatedTierConfigRequests.key]: NewUpdatedTierConfigRequests,
  [NewTierAccountRequests.key]: NewTierAccountRequests,
  [NewUpdatedTierAccountRequests.key]: NewUpdatedTierAccountRequests,
  [NewConversations.key]: NewConversations,
  [GetMessagesRequest.key]: GetMessagesRequest,
  [VisibleProducts.key]: VisibleProducts,
  [ActivationTemplates.key]: ActivationTemplates,
  [FulfillmentParameters.key]: FulfillmentParameters,
  [Hubs.key]: Hubs,
  [AccountUsers.key]: AccountUsers,
};
