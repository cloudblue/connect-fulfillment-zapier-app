/**
 * This file is part of the CloudBlue Connect Zapier Extension.
 *
 * @copyright (c) 2025 CloudBlue, Inc. All Rights Reserved.
 */

const _ = require('lodash');

const fieldsToChoices = (fields) => {
  const choices = {};
  _.each(fields, (definition, id) => {
    choices[id] = definition.default.label;
  });
  return choices;
};

module.exports = { fieldsToChoices };
