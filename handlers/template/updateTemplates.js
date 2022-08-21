'use strict';
const HttpStatus = require('http-status');
const docClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const updateTemplateSchema = require('../../libs/schema/update-template.schema');
const { validateHttpRequest, handleSuccess, handleError } = require('../../libs/response-handler');
const { getTemplate } = require('../../libs/templates/getTemplate');

const update = async (event) => {
  if (!event.pathParameters) {
    throw new Error('Missing Parameter');
  }
  let value;
  try {
    value = validateHttpRequest(event, updateTemplateSchema);
  } catch (error) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Template:Create:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: ${error}`
    );
  }

  try {
    const { userId, templateId } = event.pathParameters;
    if (!userId || !templateId) {
      return handleError(
        HttpStatus.BAD_REQUEST,
        `[Template:Update:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: "Invalid parameter"`
      );
    }

    const result = await getTemplate(userId, templateId);
    if (result && !result.Item) {
      throw new Error('Template not found');
    }

    const params = {
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Key: { user_id: userId, template_id: templateId },
      UpdateExpression: 'set template_message = :message, template_name = :name',
      ExpressionAttributeValues: {
        ':message': value.templateMessage,
        ':name': value.templateName,
      },
      ReturnValues: 'ALL_NEW',
    };
    const updateResult = await docClient.update(params);
    return handleSuccess(updateResult);
  } catch (error) {
    return handleError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      `[Template:Update:Error]: ${error.stack}}`
    );
  }
};

exports.handler = commonMiddleware(update);
