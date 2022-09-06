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
      required: ['templateName', 'templateMessage', 'userId', 'idempotentKey'],
    },
  },
  required: ['body'],
};

module.exports = { createTemplateSchema };
