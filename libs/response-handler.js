'use strict';

const HttpStatus = require('http-status');

exports.validateHttpRequest = (event, schema) => {
  if (!event.body) {
    throw new Error('Missing parameter');
  }
  const { error, value } = schema.validate(event.body);
  if (error) {
    throw new Error(error);
  }
  return value;
};

exports.handleSuccess = (data) => {
  return {
    statusCode: HttpStatus.OK,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  };
};

exports.handleError = (statusCode, message, ...rest) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: message, ...rest }),
  };
};
