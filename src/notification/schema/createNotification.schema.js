'use strict';

exports.createNotificationSchema = {
  type: 'object',
  properties: {
    body: {
      allOf: [
        {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            idempotentKey: { type: 'string' },
          },
          oneOf: [
            {
              properties: {
                message: { type: 'string' },
                recipient: { type: 'string' },
              },
              required: ['message', 'recipient'],
            },
            {
              properties: {
                message: { type: 'string' },
                recipientListFile: { type: 'string' },
              },
              required: ['message', 'recipientListFile'],
            },
            {
              properties: {
                messageTemplateId: { type: 'string' },
                recipient: { type: 'string' },
              },
              required: ['messageTemplateId', 'recipient'],
            },
            {
              properties: {
                messageTemplateId: { type: 'string' },
                recipientListFile: { type: 'string' },
              },
              required: ['messageTemplateId', 'recipientListFile'],
            },
          ],
        },
      ],
    },
  },
  required: ['body'],
};
