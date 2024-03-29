/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
 */

module.exports = [
  { key: 'id', label: 'ID' },
  { key: 'type', label: 'Type' },
  { key: 'events__created__at', label: 'Created At' },
  { key: 'events__updated__at', label: 'Updated At' },
  { key: 'attributes__provider__external_id', label: 'Provider External ID' },
  { key: 'attributes__vendor__external_id', label: 'Vendor External ID' },
  { key: 'asset__id', label: 'Asset ID' },
  { key: 'asset__status', label: 'Asset Status' },
  { key: 'asset__external_id', label: 'Asset External ID' },
  { key: 'asset__external_uid', label: 'Asset External UID' },
  { key: 'asset__product__id', label: 'Product ID' },
  { key: 'asset__product__name', label: 'Product Name' },
  { key: 'asset__product__status', label: 'Product Status' },
  { key: 'asset__marketplace__id', label: 'Asset Marketplace ID' },
  { key: 'asset__marketplace__name', label: 'Asset Marketplace Name' },
  { key: 'asset__contract__id', label: 'Asset Contract ID' },
  { key: 'asset__contract__name', label: 'Asset Contract Name' },
  { key: 'asset__connection__id', label: 'Connection ID' },
  { key: 'asset__connection__type', label: 'Connection Type' },
  { key: 'asset__connection__hub__id', label: 'Hub ID' },
  { key: 'asset__connection__hub__name', label: 'Hub Name' },
  { key: 'asset__connection__provider__id', label: 'Distributor ID' },
  { key: 'asset__connection__provider__name', label: 'Distributor Name' },
  { key: 'asset__connection__vendor__id', label: 'Vendor ID' },
  { key: 'asset__connection__vendor__name', label: 'Vendor Name' },
  { key: 'asset__tiers__tier2__id', label: 'Asset T2 ID' },
  { key: 'asset__tiers__tier2__name', label: 'Asset T2 Company Name' },
  { key: 'asset__tiers__tier2__contact_info__address_line1', label: 'Asset T2 Address Line 1' },
  { key: 'asset__tiers__tier2__contact_info__address_line2', label: 'Asset T2 Address Line 2' },
  { key: 'asset__tiers__tier2__contact_info__city', label: 'Asset T2 City' },
  { key: 'asset__tiers__tier2__contact_info__state', label: 'Asset T2 State' },
  { key: 'asset__tiers__tier2__contact_info__postal_code', label: 'Asset T2 Postal Code' },
  { key: 'asset__tiers__tier2__contact_info__contact__phone_number__country_code', label: 'Asset T2 Phone Country Code' },
  { key: 'asset__tiers__tier2__contact_info__contact__phone_number__area_code', label: 'Asset T2 Phone Area Code' },
  { key: 'asset__tiers__tier2__contact_info__contact__phone_number__phone_number', label: 'Asset T2 Phone Number' },
  { key: 'asset__tiers__tier2__contact_info__contact__phone_number__extension', label: 'Asset T2 Phone Extension' },
  { key: 'asset__tiers__tier1__id', label: 'Asset T1 ID' },
  { key: 'asset__tiers__tier1__name', label: 'Asset T1 Company Name' },
  { key: 'asset__tiers__tier1__contact_info__address_line1', label: 'Asset T1 Address Line 1' },
  { key: 'asset__tiers__tier1__contact_info__address_line2', label: 'Asset T1 Address Line 2' },
  { key: 'asset__tiers__tier1__contact_info__city', label: 'Asset T1 City' },
  { key: 'asset__tiers__tier1__contact_info__state', label: 'Asset T1 State' },
  { key: 'asset__tiers__tier1__contact_info__postal_code', label: 'Asset T1 Postal Code' },
  { key: 'asset__tiers__tier1__contact_info__contact__phone_number__country_code', label: 'Asset T1 Phone Country Code' },
  { key: 'asset__tiers__tier1__contact_info__contact__phone_number__area_code', label: 'Asset T1 Phone Area Code' },
  { key: 'asset__tiers__tier1__contact_info__contact__phone_number__phone_number', label: 'Asset T1 Phone Number' },
  { key: 'asset__tiers__tier1__contact_info__contact__phone_number__extension', label: 'Asset T1 Phone Extension' },
  { key: 'asset__tiers__customer__id', label: 'Asset Customer ID' },
  { key: 'asset__tiers__customer__name', label: 'Asset Customer Company Name' },
  { key: 'asset__tiers__customer__contact_info__address_line1', label: 'Asset Customer Address Line 1' },
  { key: 'asset__tiers__customer__contact_info__address_line2', label: 'Asset Customer Address Line 2' },
  { key: 'asset__tiers__customer__contact_info__city', label: 'Asset Customer City' },
  { key: 'asset__tiers__customer__contact_info__state', label: 'Asset Customer State' },
  { key: 'asset__tiers__customer__contact_info__postal_code', label: 'Asset Customer Postal Code' },
  { key: 'asset__tiers__customer__contact_info__contact__phone_number__country_code', label: 'Asset Customer Phone Country Code' },
  { key: 'asset__tiers__customer__contact_info__contact__phone_number__area_code', label: 'Asset Customer Phone Area Code' },
  { key: 'asset__tiers__customer__contact_info__contact__phone_number__phone_number', label: 'Asset Customer Phone Number' },
  { key: 'asset__tiers__customer__contact_info__contact__phone_number__extension', label: 'Asset Customer Phone Extension' },
  { key: 'asset__items[]id', label: 'Item ID' },
  { key: 'asset__items[]global_id', label: 'Item Global ID' },
  { key: 'asset__items[]mpn', label: 'Item MPN' },
  { key: 'asset__items[]display_name', label: 'Item Display Name' },
  { key: 'asset__items[]item_type', label: 'Item Type' },
  { key: 'asset__items[]type', label: 'Item UOM' },
  { key: 'asset__items[]period', label: 'Item Period' },
  { key: 'asset__items[]quantity', label: 'Item Quantity' },
  { key: 'asset__items[]billing__stats__provider__count', label: 'Item Distributor Billing Count' },
  { key: 'asset__items[]billing__stats__provider__last_request__id', label: 'Item Distributor Last Billing Request ID' },
  { key: 'asset__items[]billing__stats__provider__last_request__type', label: 'Item Distributor Last Billing Request Type' },
  { key: 'asset__items[]billing__stats__provider__last_request__period__from', label: 'Item Distributor Last Billing Request Period From' },
  { key: 'asset__items[]billing__stats__provider__last_request__period__to', label: 'Item Distributor Last Billing Request Period To' },
  { key: 'asset__items[]billing__stats__provider__last_request__period__delta', label: 'Item Distributor Last Billing Request Period Delta' },
  { key: 'asset__items[]billing__stats__provider__last_request__period__uom', label: 'Item Distributor Last Billing Request Period UOM' },
  { key: 'asset__items[]billing__stats__vendor__count', label: 'Item Vendor Billing Count' },
  { key: 'asset__items[]billing__stats__vendor__last_request__id', label: 'Item Vendor Last Billing Request ID' },
  { key: 'asset__items[]billing__stats__vendor__last_request__type', label: 'Item Vendor Last Billing Request Type' },
  { key: 'asset__items[]billing__stats__vendor__last_request__period__from', label: 'Item Vendor Last Billing Request Period From' },
  { key: 'asset__items[]billing__stats__vendor__last_request__period__to', label: 'Item Vendor Last Billing Request Period To' },
  { key: 'asset__items[]billing__stats__vendor__last_request__period__delta', label: 'Item Vendor Last Billing Request Period Delta' },
  { key: 'asset__items[]billing__stats__vendor__last_request__period__uom', label: 'Item Vendor Last Billing Request Period UOM' },
  { key: 'asset__params[]id', label: 'Asset Parameter ID' },
  { key: 'asset__params[]name', label: 'Asset Parameter Name' },
  { key: 'asset__params[]title', label: 'Asset Parameter Title' },
  { key: 'asset__params[]description', label: 'Asset Parameter Description' },
  { key: 'asset__params[]type', label: 'Asset Parameter Type' },
  { key: 'asset__params[]value', label: 'Asset Parameter Value' },
  { key: 'asset__params[]value_choices', label: 'Asset Parameter Value Choices' },
  { key: 'asset__params[]value_error', label: 'Asset Parameter Value Error' },
  { key: 'params[]id', label: 'Parameter ID' },
  { key: 'params[]name', label: 'Parameter Name' },
  { key: 'params[]description', label: 'Parameter Description' },
  { key: 'params[]type', label: 'Parameter Type' },
  { key: 'params[]value', label: 'Parameter Value' },
  { key: 'tiers__tier2__id', label: 'T2 ID' },
  { key: 'tiers__tier2__name', label: 'T2 Company Name' },
  { key: 'tiers__tier2__contact_info__address_line1', label: 'T2 Address Line 1' },
  { key: 'tiers__tier2__contact_info__address_line2', label: 'T2 Address Line 2' },
  { key: 'tiers__tier2__contact_info__city', label: 'T2 City' },
  { key: 'tiers__tier2__contact_info__state', label: 'T2 State' },
  { key: 'tiers__tier2__contact_info__postal_code', label: 'T2 Postal Code' },
  { key: 'tiers__tier2__contact_info__contact__phone_number__country_code', label: 'T2 Phone Country Code' },
  { key: 'tiers__tier2__contact_info__contact__phone_number__area_code', label: 'T2 Phone Area Code' },
  { key: 'tiers__tier2__contact_info__contact__phone_number__phone_number', label: 'T2 Phone Number' },
  { key: 'tiers__tier2__contact_info__contact__phone_number__extension', label: 'T2 Phone Extension' },
  { key: 'tiers__tier1__id', label: 'T1 ID' },
  { key: 'tiers__tier1__name', label: 'T1 Company Name' },
  { key: 'tiers__tier1__contact_info__address_line1', label: 'T1 Address Line 1' },
  { key: 'tiers__tier1__contact_info__address_line2', label: 'T1 Address Line 2' },
  { key: 'tiers__tier1__contact_info__city', label: 'T1 City' },
  { key: 'tiers__tier1__contact_info__state', label: 'T1 State' },
  { key: 'tiers__tier1__contact_info__postal_code', label: 'T1 Postal Code' },
  { key: 'tiers__tier1__contact_info__contact__phone_number__country_code', label: 'T1 Phone Country Code' },
  { key: 'tiers__tier1__contact_info__contact__phone_number__area_code', label: 'T1 Phone Area Code' },
  { key: 'tiers__tier1__contact_info__contact__phone_number__phone_number', label: 'T1 Phone Number' },
  { key: 'tiers__tier1__contact_info__contact__phone_number__extension', label: 'T1 Phone Extension' },
  { key: 'tiers__customer__id', label: 'Customer ID' },
  { key: 'tiers__customer__name', label: 'Customer Company Name' },
  { key: 'tiers__customer__contact_info__address_line1', label: 'Customer Address Line 1' },
  { key: 'tiers__customer__contact_info__address_line2', label: 'Customer Address Line 2' },
  { key: 'tiers__customer__contact_info__city', label: 'Customer City' },
  { key: 'tiers__customer__contact_info__state', label: 'Customer State' },
  { key: 'tiers__customer__contact_info__postal_code', label: 'Customer Postal Code' },
  { key: 'tiers__customer__contact_info__contact__phone_number__country_code', label: 'Customer Phone Country Code' },
  { key: 'tiers__customer__contact_info__contact__phone_number__area_code', label: 'Customer Phone Area Code' },
  { key: 'tiers__customer__contact_info__contact__phone_number__phone_number', label: 'Customer Phone Number' },
  { key: 'tiers__customer__contact_info__contact__phone_number__extension', label: 'Customer Phone Extension' },
  { key: 'marketplace__id', label: 'Marketplace ID' },
  { key: 'marketplace__name', label: 'Marketplace Name' },
  { key: 'contract__id', label: 'Contract ID' },
  { key: 'contract__name', label: 'Contract Name' },
  { key: 'billing__stats__provider__count', label: 'Distributor Billing Count' },
  { key: 'billing__stats__provider__last_request__id', label: 'Distributor Last Billing Request ID' },
  { key: 'billing__stats__provider__last_request__type', label: 'Distributor Last Billing Request Type' },
  { key: 'billing__stats__provider__last_request__period__from', label: 'Distributor Last Billing Request Period From' },
  { key: 'billing__stats__provider__last_request__period__to', label: 'Distributor Last Billing Request Period To' },
  { key: 'billing__stats__provider__last_request__period__delta', label: 'Distributor Last Billing Request Period Delta' },
  { key: 'billing__stats__provider__last_request__period__uom', label: 'Distributor Last Billing Request Period UOM' },
  { key: 'billing__stats__vendor__count', label: 'Vendor Billing Count' },
  { key: 'billing__stats__vendor__last_request__id', label: 'Vendor Last Billing Request ID' },
  { key: 'billing__stats__vendor__last_request__type', label: 'Vendor Last Billing Request Type' },
  { key: 'billing__stats__vendor__last_request__period__from', label: 'Vendor Last Billing Request Period From' },
  { key: 'billing__stats__vendor__last_request__period__to', label: 'Vendor Last Billing Request Period To' },
  { key: 'billing__stats__vendor__last_request__period__delta', label: 'Vendor Last Billing Request Period Delta' },
  { key: 'billing__stats__vendor__last_request__period__uom', label: 'Vendor Last Billing Request Period UOM' },
  { key: 'period__delta', label: 'Period Delta' },
  { key: 'period__uom', label: 'Period UOM' },
  { key: 'next_date', label: 'Next Date' },
  { key: 'anniversary__day', label: 'Anniversary Day' },
  { key: 'anniversary__month', label: 'Anniversary Month' },
];
