'use strict';

const updateTemplateSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        templateName: { type: 'string' },
        templateMessage: { type: 'string' },
      },
    },
    pathParameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        templateId: { type: 'string' },
      },
      required: ['userId', 'templateId'],
    },
  },
  required: ['body', 'pathParameters'],
};

module.exports = { updateTemplateSchema };
