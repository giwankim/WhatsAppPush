'use strict';

const HttpStatus = require('http-status');
const { UserTemplate } = require('../entities');
const { getTemplates } = require('../queries');
const { handleSuccess, handleError } = require('../../../libs/response-handler');
const { makeHandler } = require('../../libs/utils/handler-util');
const { getTemplatesSchema } = require('../schema');

const handler = async (event) => {
  const { userId } = event.pathParameters;
  const userTemplate = new UserTemplate({ userId });
  const { userTemplates, error } = await getTemplates({ userTemplate });
  if (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
  return handleSuccess(userTemplates);
};

exports.handler = makeHandler(handler, getTemplatesSchema);
