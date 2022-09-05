'use strict';

const getSignedUrlSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        file_name: { type: 'string' },
      },
    },
  },
  required: ['body'],
};

module.exports = { getSignedUrlSchema };
