'use strict';

const HttpStatus = require('http-status');
const { makeHandler } = require('../../libs/utils/handler-util');
const { getTemplateDetailSchema } = require('../schema');
const { handleSuccess, handleError } = require('../../libs/utils/response-util');

const handler = async (event) => {
  const { user_id: userId, template_id: templateId } = event.pathParameters;
};

exports.handler = makeHandler(handler, getTemplateDetailSchema);
