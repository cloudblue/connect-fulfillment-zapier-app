/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 Ingram Micro, Inc. All Rights Reserved.
 */

const { generateParametersFieldsForTCR } = require('./utils');


async function getTCRParametersFields(z, bundle) {
  const formFields = [
    {
      key: 'config_id',
      label: 'Tier Configuration ID',
      required: true,
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
      dynamic: 'tcr_parameters.id.title',
      altersDynamicFields: true,
      helpText: 'Choose the parameters you want to add to this Tier Configuration Request.',
    });
    if (bundle.inputData.parameter_ids
        && bundle.inputData.parameter_ids.length > 0) {
      const parameterFields = await generateParametersFieldsForTCR(z, bundle);
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
  return formFields;
}

module.exports = {
  getTCRParametersFields,
};
