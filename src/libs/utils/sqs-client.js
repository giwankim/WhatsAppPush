'use strict';

const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');

const sqsClient = new SQSClient({ region: process.env.REGION });

exports.enqueueMessage = (message) => {
  if (!message) {
    throw new Error('Invalid Message Body');
  }
  const input = {
    MessageBody: JSON.stringify(message),
    QueueUrl: process.env.WHATSAPP_MESSAGE_QUEUE_URL,
  };
  return sqsClient.send(new SendMessageCommand(input));
};
