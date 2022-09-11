'use strict';

exports.deleteTemplateSchema = {
  type: 'object',
  properties: {
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
  required: ['pathParameters'],
};
