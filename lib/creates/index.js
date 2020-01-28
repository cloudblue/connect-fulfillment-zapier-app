const RejectRequest = require('./reject_request');
const CreateAssetPurchaseRequest = require('./create_asset_purchase_request');
const CreateAssetChangeRequest = require('./create_asset_change_request');
const CreateAssetSuspendRequest = require('./create_asset_suspend_request');
const CreateAssetResumeRequest = require('./create_asset_resume_request');
const CreateAssetCancelRequest = require('./create_asset_cancel_request');
const CreateAssetRequestsFromOrder = require('./requests_from_order');
const ApproveRequest = require('./approve_request');
const InquireRequestLIS = require('./inquire_request_lis');
const InquireRequest = require('./inquire_request');
const CreateMessage = require('./create_message');
const FillFulfillmentParametersLIS = require('./fill_fulfillment_parameters_lis');
const FillFulfillmentParameters = require('./fill_fulfillment_parameters');
const FillTierParametersLIS = require('./fill_tier_parameters_lis');
const FillTierParameters = require('./fill_tier_parameters');
const ApproveTierConfigRequest = require('./approve_tier_config_request');
const FailTierConfigRequest = require('./fail_tier_config_request');
const InquireTierConfigRequestLIS = require('./inquire_tier_config_request_lis');
const InquireTierConfigRequest = require('./inquire_tier_config_request');
const CreateUpdateTierConfigRequestLIS = require('./create_update_tier_config_request_lis');
const CreateUpdateTierConfigRequest = require('./create_update_tier_config_request');


module.exports = {
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
};
