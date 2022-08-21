'use strict';
const HttpStatus = require('http-status');
const docClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const { handleSuccess, handleError } = require('../../libs/response-handler');

const list = async (event) => {
  if (!event.pathParameters) {
    throw new Error('Missing Parameter');
  }
  const { userId } = event.pathParameters;
  if (!userId) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Template:Delete:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: "Invalid parameter"`
    );
  }

  try {
    const params = {
      TableName: process.env.TEMPLATES_TABLE_NAME,
      KeyConditionExpression: 'user_id = :user_id',
      ExpressionAttributeValues: {
        ':user_id': userId,
      },
    };
    const result = await docClient.query(params);

    return handleSuccess(result.Items || []);
  } catch (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, `[Template:List:Error]: ${error}`);
  }
};

exports.handler = commonMiddleware(list);
