'use strict';

const HttpStatus = require('http-status');
const docClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const { handleSuccess, handleError } = require('../../libs/response-handler');

const deleteTemplates = async (event) => {
  if (!event.pathParameters) {
    throw new Error('Missing Parameter');
  }
  const { userId, templateId } = event.pathParameters;
  if (!templateId || !userId) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Template:Delete:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: "Invalid parameter"`
    );
  }

  try {
    const result = await docClient.get({
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Key: {
        user_id: userId,
        template_id: templateId,
      },
    });
    if (result && !result.Item) {
      throw new Error('Template not found');
    }

    const params = {
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Key: { user_id: userId, template_id: templateId },
    };

    await docClient.delete(params);

    return handleSuccess(true);
  } catch (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, `[Template:Delete:Error]: ${error}`);
  }
};

exports.handler = commonMiddleware(deleteTemplates);
