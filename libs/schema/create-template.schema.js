'use strict';
const Joi = require('@hapi/joi');

// module.exports = Joi.object({
//   template_name: Joi.string().required(),
//   template_message: Joi.string().required(),
//   user_id: Joi.string().required(),
//   idempotent_key: Joi.string().required(),
// });

module.exports = Joi.object({
  templateName: Joi.string().required(),
  templateMessage: Joi.string().required(),
  userId: Joi.string().required(),
  idempotentKey: Joi.string().required(),
});
