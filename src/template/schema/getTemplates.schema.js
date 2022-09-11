'use strict';

exports.getTemplatesSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
      additionalProperties: false,
      required: ['userId'],
    },
  },
  required: ['pathParameters'],
};
