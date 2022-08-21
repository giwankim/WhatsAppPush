'use strict';
const HttpStatus = require('http-status');
const docClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const { handleSuccess, handleError } = require('../../libs/response-handler');

const details = async (event) => {
  if (!event.pathParameters) {
    throw new Error('Missing Parameter');
  }
  const { templateId, userId } = event.pathParameters;
  if (!templateId || !userId) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Template:Details:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: "Invalid parameter"`
    );
  }

  try {
    const params = {
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Key: {
        user_id: userId,
        template_id: templateId,
      },
    };
    const result = await docClient.get(params);
    if (result && !result.Item) {
      throw new Error('Template not found.');
    }

    return handleSuccess(result.Item);
  } catch (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, `[Template:Details:Error]: ${error}`);
  }
};

exports.handler = commonMiddleware(details);
