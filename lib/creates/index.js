const RejectRequest = require('./assetRequests/reject_request');
const CreateAssetPurchaseRequest = require('./assetRequests/create_asset_purchase_request');
const CreateAssetChangeRequest = require('./assetRequests/create_asset_change_request');
const CreateAssetSuspendRequest = require('./assetRequests/create_asset_suspend_request');
const CreateAssetResumeRequest = require('./assetRequests/create_asset_resume_request');
const CreateAssetCancelRequest = require('./assetRequests/create_asset_cancel_request');
const CreateAssetRequestsFromOrder = require('./assetRequests/requests_from_order');
const ApproveRequest = require('./assetRequests/approve_request');
const InquireRequestLIS = require('./assetRequests/inquire_request_lis');
const InquireRequest = require('./assetRequests/inquire_request');
const CreateMessage = require('./create_message');
const FillFulfillmentParametersLIS = require('./assetRequests/fill_fulfillment_parameters_lis');
const FillFulfillmentParameters = require('./assetRequests/fill_fulfillment_parameters');
const FillTierParametersLIS = require('./tierConfigRequests/fill_tier_parameters_lis');
const FillTierParameters = require('./tierConfigRequests/fill_tier_parameters');
const ApproveTierConfigRequest = require('./tierConfigRequests/approve_tier_config_request');
const FailTierConfigRequest = require('./tierConfigRequests/fail_tier_config_request');
const InquireTierConfigRequestLIS = require('./tierConfigRequests/inquire_tier_config_request_lis');
const InquireTierConfigRequest = require('./tierConfigRequests/inquire_tier_config_request');
const CreateUpdateTierConfigRequestLIS = require('./tierConfigRequests/create_update_tier_config_request_lis');
const CreateUpdateTierConfigRequest = require('./tierConfigRequests/create_update_tier_config_request');
const CreateTierAccountRequest = require('./tierAccountRequests/create_request');
const AcceptTierAccountRequest = require('./tierAccountRequests/accept_request');
const IgnoreTierAccountRequest = require('./tierAccountRequests/ignore_request');
const CreateBillingRequest = require('./billingRequests/create_billing_request');

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
  [CreateBillingRequest.key]: CreateBillingRequest,
  [CreateUpdateTierConfigRequest.key]: CreateUpdateTierConfigRequest,
  [CreateUpdateTierConfigRequestLIS.key]: CreateUpdateTierConfigRequestLIS,
  [ApproveTierConfigRequest.key]: ApproveTierConfigRequest,
  [InquireTierConfigRequest.key]: InquireTierConfigRequest,
  [InquireTierConfigRequestLIS.key]: InquireTierConfigRequestLIS,
  [FillTierParameters.key]: FillTierParameters,
  [FillTierParametersLIS.key]: FillTierParametersLIS,
  [FailTierConfigRequest.key]: FailTierConfigRequest,
  [CreateTierAccountRequest.key]: CreateTierAccountRequest,
  [AcceptTierAccountRequest.key]: AcceptTierAccountRequest,
  [IgnoreTierAccountRequest.key]: IgnoreTierAccountRequest,
  [CreateMessage.key]: CreateMessage,
};
