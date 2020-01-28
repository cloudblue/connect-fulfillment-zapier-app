const SearchRequest = require('./search_requests');
const SearchTierConfigRequest = require('./search_tier_config_requests');

module.exports = {
  [SearchRequest.key]: SearchRequest,
  [SearchTierConfigRequest.key]: SearchTierConfigRequest,
};
