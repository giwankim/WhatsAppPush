'use strict';

const ddbDocClient = require('../../libs/dynamodb-client');

exports.createTemplate = async (template) => {
  try {
    await ddbDocClient.put({
      TableName: process.env.TEMPLATE_TABLE_NAME,
      Item: template.toItem(),
    });
    return template;
  } catch (error) {
    console.log('Error creating template');
    console.log(error);
    return {
      error: 'Could not create template',
    };
  }
};
