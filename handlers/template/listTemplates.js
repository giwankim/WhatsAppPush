'use strict';
const HttpStatus = require('http-status');
const docClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const { validateHttpRequest, handleSuccess, handleError } = require('../../libs/response-handler');

const list = async (event) => {
  if (!event.pathParameters) {
    throw new Error('Missing Parameter');
  }
  const { userId } = event.pathParameters;
  if (!userId) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Template:Delete:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: "Invalid parameter"`
    );
  }
  const params = {};
};

exports.list = commonMiddleware(list);
