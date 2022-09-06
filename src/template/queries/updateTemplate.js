'use strict';

const { ConditionalCheckFailedException } = require('@aws-sdk/client-dynamodb');
const ddbDocClient = require('../../libs/dynamodb-client');

exports.updateTemplate = async (template) => {
  try {
    const response = await ddbDocClient.update({
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Key: template.key(),
      ConditionExpression: 'attribute_exists(user_id)',
      UpdateExpression: 'SET template_message = :templateMessage, template_name = :templateName',
      ExpressionAttributeValues: {
        ':templateMessage': template.templateMessage,
        ':templateName': template.templateName,
      },
      ReturnValues: 'ALL_NEW',
    });
    return {
      template: response.Attributes,
    };
  } catch (error) {
    console.log('Error updating template');
    console.log(error);
    let errorMessage = 'Could not update template';
    if (error instanceof ConditionalCheckFailedException) {
      errorMessage = 'Template does not exist';
    }
    return { error: errorMessage };
  }
};
