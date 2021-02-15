const SearchRequest = require('./search_requests');
const SearchTierConfigRequest = require('./search_tier_config_requests');
const SearchTierConfig = require('./search_tier_configs');
const SearchTierAccountRequests = require('./search_tier_account_requests');
const SearchAsset = require('./search_assets');
const SearchConversation = require('./search_conversations');
const SearchBillingRequest = require('./search_billing_requests');
const SearchRecurringAsset = require('./search_recurring_assets');
const SearchListingRequest = require('./search_listing_requests');
const SearchCase = require('./search_cases');
const SearchCaseConversations = require('./search_case_conversations');

module.exports = {
  [SearchRequest.key]: SearchRequest,
  [SearchTierConfigRequest.key]: SearchTierConfigRequest,
  [SearchTierConfig.key]: SearchTierConfig,
  [SearchTierAccountRequests.key]: SearchTierAccountRequests,
  [SearchAsset.key]: SearchAsset,
  [SearchBillingRequest.key]: SearchBillingRequest,
  [SearchRecurringAsset.key]: SearchRecurringAsset,
  [SearchConversation.key]: SearchConversation,
  [SearchListingRequest.key]: SearchListingRequest,
  [SearchCase.key]: SearchCase,
  [SearchCaseConversations.key]: SearchCaseConversations,

};
