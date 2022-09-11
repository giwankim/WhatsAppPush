'use strict';

const ddbDocClient = require('../../libs/dynamodb-client');
const { notificationFromItem } = require('../entities');

exports.getNotificationByUserIdAndKey = async (userId, idempotentKey) => {
  try {
    const response = await ddbDocClient.query({
      TableName: process.env.NOTIFICATION_TASK_TABLE_NAME,
      Limit: 1,
      KeyConditionExpression: 'user_id = :userId',
      FilterExpression: 'idempotent_key = :idempotentKey',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':idempotentKey': idempotentKey,
      },
    });
    return { notifications: response.Items.map((item) => notificationFromItem(item)) };
  } catch (error) {
    console.log('Error retrieving notifications by user_id and idempotent_key');
    console.log(error);
    return {
      error: 'Could not find notifications',
    };
  }
};
