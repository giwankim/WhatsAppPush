'use strict';
const HttpStatus = require('http-status');
const { v4: uuid } = require('uuid');
const docClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const createTemplatesSchema = require('../../libs/schema/create-template.schema');
const { validateHttpRequest, handleSuccess, handleError } = require('../../libs/response-handler');
const { queryTemplates } = require('../../libs/templates/queryTemplates');

const create = async (event) => {
  let value;
  try {
    value = validateHttpRequest(event, createTemplatesSchema);
  } catch (error) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Template:Create:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: ${error}`
    );
  }

  try {
    const { templateName, templateMessage, userId, idempotentKey } = value;

    const queryResult = await queryTemplates(userId, idempotentKey);
    if (!!queryResult && queryResult.Count && queryResult.Items.length) {
      return handleSuccess(queryResult.Items[0]);
    }

    const params = {
      TableName: process.env.TEMPLATES_TABLE_NAME,
      Item: {
        user_id: userId,
        template_id: uuid(),
        template_message: templateMessage,
        template_name: templateName,
        created_at: Date.now(),
        idempotent_key: idempotentKey,
      },
    };

    await docClient.put(params);

    return handleSuccess(params.Item);
  } catch (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, `[Template:Create:Error]: ${error.stack}`);
  }
};

exports.handler = commonMiddleware(create);
