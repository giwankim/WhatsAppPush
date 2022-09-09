'use strict';

const ddbDocClient = require('../../libs/dynamodb-client');
const { templateFromItem } = require('../entities');

exports.getTemplateDetail = async ({ template }) => {
  try {
    const response = await ddbDocClient.get({
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Key: template.key(),
    });
    if (!response.Item) {
      return {
        error: 'Template does not exist',
      };
    }
    return { template: templateFromItem(response.Item) };
  } catch (error) {
    console.log('Error retrieving template');
    console.log(error);
    return { error: 'Could not retrieve template' };
  }
};
