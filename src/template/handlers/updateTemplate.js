'use strict';

const HttpStatus = require('http-status');
const { Template } = require('../entities');
const { updateTemplate } = require('../queries/updateTemplate');
const { makeHandler } = require('../../libs/utils/handler-util');
const { updateTemplateSchema } = require('../schema');
const { handleSuccess, handleError } = require('../../libs/utils/response-util');

const handler = async (event) => {
  const { userId, templateId } = event.pathParameters;
  const { templateName, templateMessage } = event.body;
  const templateObj = new Template({ templateName, templateMessage, userId, templateId });
  const { template, error } = await updateTemplate(templateObj);
  if (error) {
    if (error === 'Template does not exist') {
      return handleError(HttpStatus.BAD_REQUEST, error);
    }
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
  return handleSuccess(template);
};

exports.handler = makeHandler(handler, updateTemplateSchema);
