'use strict';

const HttpStatus = require('http-status');
const { Notification } = require('../entities');
const { createNotificationSchema } = require('../schema');
const { getNotificationByUserIdAndKey, createNotification } = require('../queries');
const { makeHandler } = require('../../libs/utils/handler-util');
const { handleSuccess, handleError } = require('../../libs/utils/response-util');

const handler = async (event) => {
  const { userId, idempotentKey, message, messageTemplateId, recipient, recipientListFile } =
    event.body;
  const { notifications } = getNotificationByUserIdAndKey(userId, idempotentKey);
  if (notifications && notifications.length) {
    return handleSuccess(notifications[0]);
  }
  const notification = new Notification({
    userId,
    idempotentKey,
    message,
    messageTemplateId,
    recipient,
    recipientListFile,
  });
  const { error } = await createNotification({ notification });
  if (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
  return handleSuccess(notification);
};

exports.handler = makeHandler(handler, createNotificationSchema);
