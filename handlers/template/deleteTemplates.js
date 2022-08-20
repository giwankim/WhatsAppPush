'use strict';
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const docClient = require('../../libs/dynamodb-client');

const deleteTemplates = async (event) => {
  const { userId, templateId } = event.pathParameters;

  const params = {};
  await docClient.delete(params);
};

exports.handler = commonMiddleware(deleteTemplates);
