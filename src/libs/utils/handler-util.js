'use strict';

const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const httpErrorHandler = require('@middy/http-error-handler');
const validator = require('@middy/validator');

exports.makeHandler = (handler, inputSchema) =>
  middy(handler).use(jsonBodyParser()).use(validator({ inputSchema })).use(httpErrorHandler());
