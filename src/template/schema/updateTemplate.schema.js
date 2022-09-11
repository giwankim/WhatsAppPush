'use strict';

exports.updateTemplateSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        templateName: { type: 'string' },
        templateMessage: { type: 'string' },
      },
      additionalProperties: false,
      required: ['templateName', 'templateMessage'],
    },
    pathParameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        templateId: { type: 'string' },
      },
      additionalProperties: false,
      required: ['userId', 'templateId'],
    },
  },
  required: ['body', 'pathParameters'],
};
