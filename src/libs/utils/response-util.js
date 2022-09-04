'use strict';

const HttpStatus = require('http-status');

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
