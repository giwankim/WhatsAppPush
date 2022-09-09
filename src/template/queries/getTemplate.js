'use strict';

const ddbDocClient = require('../../libs/dynamodb-client');

exports.getTemplate = async () => {
  try {
    const response = ddbDocClient;
  } catch (error) {
    console.log('Error retrieving template');
    console.log(error);
    return { error: 'Could not retrieve template' };
  }
};
