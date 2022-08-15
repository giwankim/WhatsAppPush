'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  template_name: Joi.string().required(),
  template_message: Joi.string().required(),
  user_id: Joi.string().required(),
  idempotent_key: Joi.string().required(),
});
