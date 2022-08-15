'use strict';

const HttpStatus = require('http-status');
const { v4: uuid } = require('uuid');
const docClient = require('../../libs/dynamodb-client');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const createTemplatesSchema = require('../../libs/schema/create-template.schema');
const { validateHttpRequest, handleSuccess, handleError } = require('../../libs/response-handler');

const tableName = process.env.TEMPLATES_TABLE_NAME;

const queryTemplate = (user_id, idempotent_key) => {
  const params = {
    TableName: tableName,
    Limit: 1,
    KeyConditionExpression: 'user_id = :user_id',
    FilterExpression: 'idempotent_key = :idempotent_key',
    ExpressionAttributeValues: {
      ':user_id': user_id,
      ':idempotent_key': idempotent_key,
    },
  };
  return docClient.query(params);
};

const createTemplate = async (event, context) => {
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
    const { template_name, template_message, user_id, idempotent_key } = value;

    const queryResult = await queryTemplate(user_id, idempotent_key);
    if (!!queryResult && queryResult.Count && queryResult.Items.length) {
      return handleSuccess(queryResult.Items[0]);
    }

    const params = {
      TableName: tableName,
      Item: {
        user_id,
        template_id: uuid(),
        template_message,
        template_name,
        created_at: Date.now(),
        idempotent_key,
      },
    };
    await docClient.put(params);

    return handleSuccess(params.Item);
  } catch (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, `[Template:Create:Error]: ${error.stack}`);
  }
};

exports.handler = commonMiddleware(createTemplate);
