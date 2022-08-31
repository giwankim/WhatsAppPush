'use strict';
const HttpStatus = require('http-status');
const ddbDocClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const { handleSuccess, handleError } = require('../../libs/response-handler');

const list = async (event) => {
  const { userId } = event.pathParameters;
  if (!userId) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[ListNotifications:List:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: Invalid 'user_id'`
    );
  }
  try {
    const params = {
      TableName: process.env.NOTIFICATION_TASK_TABLE_NAME,
      KeyConditionExpression: 'user_id = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };
    const result = await ddbDocClient.query(params);
    return handleSuccess(result.Items);
  } catch (error) {
    return handleError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      `[ListNotifications:List:Error]: ${error}`
    );
  }
};

exports.handler = commonMiddleware(list);
