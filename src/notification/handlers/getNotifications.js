'use strict';

const HttpStatus = require('http-status');
const { makeHandler } = require('../../libs/utils/handler-util');
const { handleSuccess, handleError } = require('../../libs/utils/response-util');

const handler = async (event) => {
  return handleError(HttpStatus.NOT_IMPLEMENTED, 'Not implemented');
};

exports.handler = makeHandler(handler, null);
