'use strict';

const HttpStatus = require('http-status');

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

module.exports = { handleSuccess, handleError };
