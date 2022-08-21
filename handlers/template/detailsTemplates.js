'use strict';
const HttpStatus = require('http-status');
const docClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const { validateHttpRequest, handleSuccess, handleError } = require('../../libs/response-handler');

const details = (event) => {};

exports.handler = commonMiddleware(details);
