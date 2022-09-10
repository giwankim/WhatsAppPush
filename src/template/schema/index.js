'use strict';

const { createTemplateSchema } = require('./createTemplate.schema');
const { updateTemplateSchema } = require('./updateTemplate.schema');
const { getTemplateSchema } = require('./getTemplate.schema');
const { deleteTemplateSchema } = require('./deleteTemplate.schema');

module.exports = {
  createTemplateSchema,
  updateTemplateSchema,
  getTemplateSchema,
  deleteTemplateSchema,
};
