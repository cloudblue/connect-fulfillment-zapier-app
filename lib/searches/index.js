const SearchRequest = require('./search_requests');
const SearchTierConfigRequest = require('./search_tier_config_requests');
const SearchTierConfig = require('./search_tier_configs');
const SearchTierAccountRequests = require('./search_tier_account_requests');
const SearchAsset = require('./search_assets');
const SearchBillingRequest = require('./search_billing_requests');
const SearchRecurringAsset = require('./search_recurring_assets');

module.exports = {
  [SearchRequest.key]: SearchRequest,
  [SearchTierConfigRequest.key]: SearchTierConfigRequest,
  [SearchTierConfig.key]: SearchTierConfig,
  [SearchTierAccountRequests.key]: SearchTierAccountRequests,
  [SearchAsset.key]: SearchAsset,
  [SearchBillingRequest.key]: SearchBillingRequest,
  [SearchRecurringAsset.key]: SearchRecurringAsset,
};
