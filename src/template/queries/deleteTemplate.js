'use strict';

const { ConditionalCheckFailedException } = require('@aws-sdk/client-dynamodb');
const ddbDocClient = require('../../libs/dynamodb-client');

exports.deleteTemplate = async ({ template }) => {
  try {
    const response = await ddbDocClient.delete({
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Key: template.key(),
      ConditionExpression: 'attribute_exists(user_id)',
    });
    return { response };
  } catch (error) {
    console.log('Failed to delete template');
    console.log(error);
    let errorMessage = 'Could not delete template';
    if (error instanceof ConditionalCheckFailedException) {
      errorMessage = 'Template does not exists';
    }
    return { error: errorMessage };
  }
};
