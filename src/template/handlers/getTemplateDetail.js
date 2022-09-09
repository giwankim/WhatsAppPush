'use strict';

const HttpStatus = require('http-status');
const { Template } = require('../entities');
const { getTemplateDetail } = require('../queries');
const { getTemplateDetailSchema } = require('../schema');
const { makeHandler } = require('../../libs/utils/handler-util');
const { handleSuccess, handleError } = require('../../libs/utils/response-util');

const handler = async (event) => {
  const { userId, templateId } = event.pathParameters;
  const templateObj = new Template({ userId, templateId });
  const { template, error } = await getTemplateDetail({ template: templateObj });
  if (error) {
    if (error === 'Template does not exist') {
      return handleError(HttpStatus.BAD_REQUEST, error);
    }
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
  return handleSuccess(template);
};

exports.handler = makeHandler(handler, getTemplateDetailSchema);
