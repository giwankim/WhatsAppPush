'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  user_id: Joi.string().required(),
  message: Joi.string(),
  message_template_id: Joi.string(),
  recipient: Joi.string(),
  recipient_list_file: Joi.string(),
  idempotent_key: Joi.string().required(),
})
  .xor('message', 'message_template_id')
  .xor('recipient', 'recipient_list_file');
