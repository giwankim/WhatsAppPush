'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  templateName: Joi.string().required(),
  templateMessage: Joi.string().required(),
  userId: Joi.string().required(),
  idempotentKey: Joi.string().required(),
});
