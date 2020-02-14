const SearchRequest = require('./search_requests');
const SearchTierConfigRequest = require('./search_tier_config_requests');
const SearchTierConfig = require('./search_tier_configs');
const SearchAsset = require('./search_assets');

module.exports = {
  [SearchRequest.key]: SearchRequest,
  [SearchTierConfigRequest.key]: SearchTierConfigRequest,
  [SearchTierConfig.key]: SearchTierConfig,
  [SearchAsset.key]: SearchAsset,
};
