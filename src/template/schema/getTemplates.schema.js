'use strict';

const getTemplatesSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
      required: ['userId'],
    },
  },
  required: ['pathParameters'],
};

module.exports = { getTemplatesSchema };
