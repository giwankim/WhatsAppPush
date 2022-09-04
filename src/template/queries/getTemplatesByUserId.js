'use strict';

const ddbDocClient = require('../../libs/dynamodb-client');

exports.getTemplatesByUserId = async (userId, idempotentKey) => {
  try {
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
    const response = await ddbDocClient.query(params);
    return {
      templates: response.Items,
    };
  } catch (error) {
    console.log('Error retrieving templates by user_id and idempotent_key');
    console.log(error);
    return {
      error: 'Could not retrieve templates',
    };
  }
};
