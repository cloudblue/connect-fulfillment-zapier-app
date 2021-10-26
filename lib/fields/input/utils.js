/**
 * This file is part of the Ingram Micro Cloud Blue Connect Zapier Extension.
 *
 * @copyright (c) 2020 - 2021 Ingram Micro, Inc. All Rights Reserved.
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
