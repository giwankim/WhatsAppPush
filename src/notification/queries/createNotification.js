'use strict';

const { ConditionalCheckFailedException } = require('@aws-sdk/client-dynamodb');
const ddbDocClient = require('../../libs/dynamodb-client');

exports.createNotification = async ({ notification }) => {
  try {
    await ddbDocClient.put({
      TableName: process.env.NOTIFICATION_TASK_TABLE_NAME,
      Item: notification.toItem(),
      ConditionExpression: 'attribute_not_exists(user_id)',
    });
    return { notification };
  } catch (error) {
    console.log('Error creating notification');
    console.log(error);
    let errorMessage = 'Could not create notification';
    if (error instanceof ConditionalCheckFailedException) {
      errorMessage = 'Notification with this notification_id already exists for this user';
    }
    return {
      error: errorMessage,
    };
  }
};
