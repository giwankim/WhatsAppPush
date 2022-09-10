'use strict';

const { ConditionalCheckFailedException } = require('@aws-sdk/client-dynamodb');
const ddbDocClient = require('../../libs/dynamodb-client');

exports.createTemplate = async (template) => {
  try {
    await ddbDocClient.put({
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Item: template.toItem(),
      ConditionExpression: 'attribute_not_exists(user_id)',
    });
    return { template };
  } catch (error) {
    console.log('Error creating template');
    console.log(error);
    let errorMessage = 'Could not create template';
    if (error instanceof ConditionalCheckFailedException) {
      errorMessage = 'Template with this id exists for this user';
    }
    return {
      error: errorMessage,
    };
  }
};
