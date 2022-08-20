'use strict';
const docClient = require('../dynamodb-client');

exports.queryTemplates = (userId, idempotentKey) => {
  const params = {
    TableName: process.env.TEMPLATES_TABLE_NAME,
    Limit: 1,
    KeyConditionExpression: 'user_id = :user_id',
    FilterExpression: 'idempotent_key = :idempotent_key',
    ExpressionAttributeValues: {
      ':user_id': userId,
      ':idempotent_key': idempotentKey,
    },
  };
  return docClient.query(params);
};
