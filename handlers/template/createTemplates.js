'use strict';

const HttpStatus = require('http-status');
const { v4: uuid } = require('uuid');
const ddbDocClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const createTemplatesSchema = require('../../libs/schema/create-template.schema');
const { handleSuccess, handleError } = require('../../libs/response-handler');

const { TEMPLATES_TABLE_NAME } = process.env;

const queryTemplates = (userId, idempotentKey) => {
  return ddbDocClient.query({
    TableName: TEMPLATES_TABLE_NAME,
    Limit: 1,
    KeyConditionExpression: 'user_id = :user_id',
    FilterExpression: 'idempotent_key = :idempotent_key',
    ExpressionAttributeValues: {
      ':user_id': userId,
      ':idempotent_key': idempotentKey,
    },
  });
};

const create = async (event) => {
  const { error, value } = createTemplatesSchema.validate(event.body);
  if (error) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Template:Create:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: ${error}`
    );
  }

  const { templateName, templateMessage, userId, idempotentKey } = value;
  try {
    const queryResult = await queryTemplates(userId, idempotentKey);
    if (!!queryResult && queryResult.Count && queryResult.Items.length) {
      return handleSuccess(queryResult.Items[0]);
    }
    const template = {
      user_id: userId,
      template_id: uuid(),
      template_message: templateMessage,
      template_name: templateName,
      created_at: Date.now(),
      idempotent_key: idempotentKey,
    };
    await ddbDocClient.put({ TableName: TEMPLATES_TABLE_NAME, Item: template });
    return handleSuccess(template);
  } catch (err) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, `[Template:Create:Error]: ${err.stack}`);
  }
};

exports.handler = commonMiddleware(create);
