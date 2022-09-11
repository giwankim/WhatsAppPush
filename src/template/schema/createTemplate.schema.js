'use strict';

const createTemplateSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        templateName: { type: 'string' },
        templateMessage: { type: 'string' },
        userId: { type: 'string' },
        idempotentKey: { type: 'string' },
      },
      additionalProperties: false,
      required: ['templateName', 'templateMessage', 'userId', 'idempotentKey'],
    },
  },
  required: ['body'],
};

module.exports = { createTemplateSchema };
