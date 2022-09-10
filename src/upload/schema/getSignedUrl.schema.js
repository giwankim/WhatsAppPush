'use strict';

const getSignedUrlSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        fileName: { type: 'string' },
      },
      required: ['fileName'],
    },
    pathParameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
      required: ['userId'],
    },
  },
  required: ['body', 'pathParameters'],
};

module.exports = { getSignedUrlSchema };
