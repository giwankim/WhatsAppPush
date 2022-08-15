'use strict';

const HttpStatus = require('http-status');

const validateHttpRequest = (event, schema) => {
  // TODO
  if (!event.body) {
    throw new Error('Missing parameter');
  }
  const requestBody = JSON.parse(event.body);
  const { error, value } = schema.validate(requestBody);
  if (error) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Template:Create:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: ${error}`
    );
  }
  return value;
};

const handleSuccess = (data) => {
  return {
    statusCode: HttpStatus.OK,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  };
};

const handleError = (statusCode, message, ...rest) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: message, ...rest }),
  };
};

module.exports = { validateHttpRequest, handleSuccess, handleError };
