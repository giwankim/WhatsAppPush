'use strict';

const { v4: uuid } = require('uuid');

class Template {
  constructor({
    templateName,
    templateMessage,
    userId,
    idempotentKey,
    templateId = uuid(),
    createdAt = Date.now(),
  }) {
    this.templateName = templateName;
    this.templateMessage = templateMessage;
    this.userId = userId;
    this.idempotentKey = idempotentKey;
    this.templateId = templateId;
    this.createdAt = createdAt;
  }

  key() {
    return {
      user_id: this.userId,
      template_id: this.templateId,
    };
  }

  toItem() {
    return {
      user_id: this.userId,
      template_id: this.templateId,
      template_message: this.templateMessage,
      template_name: this.templateName,
      created_at: this.createdAt,
      idempotent_key: this.idempotentKey,
    };
  }
}

const templateFromItem = (item) => {
  return new Template({
    templateId: item.template_id,
    templateName: item.template_name,
    templateMessage: item.template_message,
    userId: item.user_id,
    idempotentKey: item.idempotent_key,
    createdAt: new Date(item.created_at),
  });
};

module.exports = { Template, templateFromItem };
