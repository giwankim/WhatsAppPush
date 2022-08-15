'use strict';
// eslint-disable-next-line import/no-extraneous-dependencies
const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const docClient = new DocumentClient();

const get = (params) => {
  return docClient.get(params).promise();
};

const put = (params) => {
  return docClient.put(params).promise();
};

const query = (params) => {
  return docClient.query(params).promise();
};

module.exports = {
  get,
  put,
  query,
};
