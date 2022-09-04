'use strict';

const HttpStatus = require('http-status');
const createTemplateSchema = require('../schema/createTemplate.schema');
const { Template } = require('../entities');
const { getTemplatesByUserId, createTemplate } = require('../queries');
const { makeHandler } = require('../../libs/utils/handler-util');
const { handleSuccess, handleError } = require('../../libs/utils/response-util');

const handler = async (event) => {
  const { templateName, templateMessage, userId, idempotentKey } = event.body;
  const { templates } = await getTemplatesByUserId(userId, idempotentKey);
  if (templates && templates.length) {
    return handleSuccess(templates[0]);
  }
  const template = new Template({
    templateName,
    templateMessage,
    userId,
    idempotentKey,
  });
  const { error } = await createTemplate(template);
  if (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
  return handleSuccess(template);
};

exports.handler = makeHandler(handler, createTemplateSchema);
