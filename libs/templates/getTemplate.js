'use strict';
const docClient = require('../dynamodb-client');

exports.getTemplate = (userId, templateId) => {
  const params = {
    TableName: process.env.TEMPLATES_TABLE_NAME,
    Key: { user_id: userId, template_id: templateId },
  };
  return docClient.get(params);
};
