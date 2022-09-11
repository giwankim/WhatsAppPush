'use strict';

const { v4: uuid } = require('uuid');

class Notification {
  constructor({
    userId,
    message,
    messageTemplateId,
    recipient,
    recipientListFile,
    idempotentKey,
    createdAt = new Date(),
  }) {
    this.notificationId = uuid();
    this.userId = userId;
    this.message = message;
    this.messageTemplateId = messageTemplateId;
    this.recipient = recipient;
    this.recipientListFile = recipientListFile;
    this.idempotentKey = idempotentKey;
    this.createdAt = createdAt;
  }

  key() {
    return {
      user_id: this.userId,
      notification_id: this.notificationId,
    };
  }

  pk() {
    return this.userId;
  }

  sk() {
    return this.notificationId;
  }

  toItem() {
    return {
      user_id: this.userId,
      notification_id: this.notificationId,
      message: this.message,
      message_template_id: this.messageTemplateId,
      recipient: this.recipient,
      recipient_list_file: this.recipientListFile,
      idempotent_key: this.idempotentKey,
      created_at: this.createdAt.toISOString(),
    };
  }
}

const notificationFromItem = (attributes) => {
  return new Notification({
    userId: attributes.user_id,
    message: attributes.message,
    messageTemplateId: attributes.message_template_id,
    recipient: attributes.recipient,
    recipientListFile: attributes.recipient_list_file,
    idempotentKey: attributes.idempotent_key,
    createdAt: new Date(attributes.created_at),
  });
};

module.exports = { Notification, notificationFromItem };
