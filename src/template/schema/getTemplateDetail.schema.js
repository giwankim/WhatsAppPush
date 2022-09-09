'use strict';

const getTemplateDetailSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        user_id: { type: 'string' },
        template_id: { type: 'string' },
      },
      required: ['user_id', 'template_id'],
    },
  },
  required: ['pathParameters'],
};

module.exports = { getTemplateDetailSchema };
