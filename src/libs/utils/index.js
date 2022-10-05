'use strict';

const { makeHandler } = require('./handler-util');
const { handleSuccess, handleError } = require('./response-util');

module.exports = {
  makeHandler,
  handleSuccess,
  handleError,
};
