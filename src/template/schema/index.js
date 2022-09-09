'use strict';

const { createTemplateSchema } = require('./createTemplate.schema');
const { updateTemplateSchema } = require('./updateTemplate.schema');
const { getTemplateDetailSchema } = require('./getTemplateDetail.schema');

module.exports = { createTemplateSchema, updateTemplateSchema, getTemplateDetailSchema };
