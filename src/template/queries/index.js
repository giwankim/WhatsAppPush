'use strict';

const { createTemplate } = require('./createTemplate');
const { getTemplatesByUserId } = require('./getTemplatesByUserId');
const { getTemplate } = require('./getTemplate');
const { deleteTemplate } = require('./deleteTemplate');
const { getTemplates } = require('./getTemplates');

module.exports = {
  createTemplate,
  getTemplatesByUserId,
  getTemplate,
  deleteTemplate,
  getTemplates,
};
