'use strict';

const HttpStatus = require('http-status');
const { Template } = require('../entities');
const { deleteTemplate } = require('../queries');
const { handleSuccess, handleError } = require('../../libs/utils/response-util');
const { makeHandler } = require('../../libs/utils/handler-util');
const { deleteTemplateSchema } = require('../schema');

const handler = async (event) => {
  const { userId, templateId } = event.pathParameters;
  const templateObj = new Template({ userId, templateId });
  const { error } = await deleteTemplate({ template: templateObj });
  if (error) {
    if (error === 'Template does not exists') {
      return handleError(HttpStatus.BAD_REQUEST, error);
    }
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
  return handleSuccess(true);
};

exports.handler = makeHandler(handler, deleteTemplateSchema);
