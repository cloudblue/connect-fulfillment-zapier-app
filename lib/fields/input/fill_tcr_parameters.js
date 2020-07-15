/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { generateParametersFieldsForTCRFill } = require('./utils');


async function getFillTCRParametersFields(z, bundle) {
  const formFields = [
    {
      key: 'request_id',
      label: 'Request ID',
      required: true,
      helpText: 'Specify the request ID to set to inquire, this one can come from previous '
      + 'steps of the Zap or from a Search.',
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
      dynamic: 'fill_tcr_parameters.id.title',
      altersDynamicFields: true,
      helpText: 'Choose the parameters you want to add to this Tier Configuration Request.',
    });
    if (bundle.inputData.parameter_ids
        && bundle.inputData.parameter_ids.length > 0) {
      const parameterFields = await generateParametersFieldsForTCRFill(z, bundle);
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
      helpText: 'Enter a list of Parameter ID, Value',
    });
  }
  formFields.push({ key: 'notes', label: 'Notes' });
  return formFields;
}

module.exports = {
  getFillTCRParametersFields,
};
