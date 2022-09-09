'use strict';

const getTemplateDetailSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        templateId: { type: 'string' },
      },
      required: ['userId', 'templateId'],
    },
  },
  required: ['pathParameters'],
};

module.exports = { getTemplateDetailSchema };
