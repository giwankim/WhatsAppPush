'use strict';

const getSignedUrlSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        fileName: { type: 'string' },
      },
      additionalProperties: false,
      required: ['fileName'],
    },
    pathParameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
      additionalProperties: false,
      required: ['userId'],
    },
  },
  required: ['body', 'pathParameters'],
};

module.exports = { getSignedUrlSchema };
