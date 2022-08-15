'use strict';

const HttpStatus = require('http-status');

const validateHttpRequest = (event, schema) => {
  if (!event.body) {
    throw new Error('Missing parameter');
  }
  const { error, value } = schema.validate(event.body);
  if (error) {
    throw new Error(error);
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
