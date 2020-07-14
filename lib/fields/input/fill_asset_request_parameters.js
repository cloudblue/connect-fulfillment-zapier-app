/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { generateParametersFieldsForFill } = require('./utils');


async function getFillAssetRequestParametersFields(z, bundle) {
  const formFields = [
    {
      key: 'request_id',
      label: 'Request ID',
      required: true,
      helpText: 'Specify the request ID to update, this one can come from previous steps of the Zap or from a Search.',
    },
    {
      key: 'params_input_mode',
      label: 'Parameters Input Mode',
      choices: {
        form: 'Form Mode',
        raw: 'Raw Mode',
      },
      required: true,
      helpText: 'Choose the input mode for parameters.',
      altersDynamicFields: true,
      default: 'raw',
    },
  ];

  if (bundle.inputData.params_input_mode === 'form') {
    formFields.push({
      key: 'parameter_ids',
      label: 'Parameter',
      type: 'string',
      list: true,
      dynamic: 'ordering_fulfillment_parameters.id.title',
      altersDynamicFields: true,
      helpText: 'Choose the parameters you want to add to this Asset Purchase Request.',
    });
    if (bundle.inputData.parameter_ids
        && bundle.inputData.parameter_ids.length > 0) {
      const parameterFields = await generateParametersFieldsForFill(z, bundle);
      if (parameterFields.length > 0) {
        formFields.push(...parameterFields);
      }
    }
  } else {
    formFields.push({
      key: 'params',
      dict: true,
      required: true,
      label: 'Parameters',
      helpText: 'Provide the list of parameters to set value, first field is to specify the '
        + 'parameter id as seen on CloudBlue Connect portals, the second field is to provide '
        + 'it\'s value. Please note that both can be populated from previous steps in the Zap.',
    });
  }
  return formFields;
}

module.exports = {
  getFillAssetRequestParametersFields,
};
