'use strict';

const ddbDocClient = require('../../libs/dynamodb-client');
const { userTemplateFromItem } = require('../entities');

exports.getTemplates = async ({ userTemplate }) => {
  try {
    const response = await ddbDocClient.query({
      TableName: process.env.TEMPLATES_TABLE_NAME,
      KeyConditionExpression: 'user_id = :userId',
      ExpressionAttributeValues: {
        ':userId': userTemplate.pk(),
      },
    });
    return {
      userTemplates: response.Items.map((item) => userTemplateFromItem(item)),
    };
  } catch (error) {
    console.log('Error retrieving templates for user');
    console.log(error);
    return {
      error: 'Could not retrieve templates for user',
    };
  }
};
